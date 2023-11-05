const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const imagekit = require('../libs/imagekit');

module.exports= {
    createPost: async (req,res,next)=>{
        try {
            const {title, description} = req.body;

            if(!req.file){
                return res.status(400).json({
                    status: "failed",
                    message: "Image is required"
                })
            }
            ImageBase64 = req.file.buffer.toString('base64');

            if(!title || !description){
                return res.status(400).json({
                    status: "failed",
                    message: "Title and description is required"
                })
            }

            const {url, fileId}= await imagekit.upload({
                file: ImageBase64,
                fileName: `post-${Date.now()}`,
                folder: '/posts',
            })

            const post = await prisma.post.create({
                data:{
                    title,
                    description,
                    image: {
                        create:{
                            url,
                            imageId: fileId,
                        }
                    }
                },
                include:{
                    image: true,
                }
            })

            res.status(201).json({
                status: "success",
                message: "Created",
                data: post
            })

        } catch (error) {
            next(error)
        }
    },

    getAllPost: async (req,res,next)=>{
        try {
            const posts = await prisma.post.findMany({
                include:{
                    image: true,
                }
            })

            res.status(200).json({
                status: "success",
                message: "Get all post",
                data: posts
            })
        } catch (error) {
            next(error)
        }
    },

    getPost: async (req,res,next)=>{
        try {
            const {id} = req.params;

            const post = await prisma.post.findUnique({
                where:{
                    id: parseInt(id)
                },
                include:{
                    image: true,
                }
            })

            res.status(200).json({
                status: "success",
                message: "Get post",
                data: post
            })
        } catch (error) {
            next(error)
        }
    },
    
    updatePost: async (req,res,next)=>{
        try {
            const {id} = req.params;
            const {title, description} = req.body;

            if(!title || !description){
                return res.status(400).json({
                    status: "failed",
                    message: "Title and description is required"
                })
            }

            const post = await prisma.post.update({
                where:{
                    id: parseInt(id)
                },
                data:{
                    title,
                    description,
                },
                include:{
                    image: true,
                }
            })

            res.status(200).json({
                status: "success",
                message: "Updated",
                data: post
            })
        } catch (error) {
            next(error)
        }
    },
    deletePost: async (req,res,next)=>{
        try {
            const {id} = req.params;

            const post = await prisma.post.delete({
                where:{
                    id: parseInt(id)
                },
                include:{
                    image: true,
                }
            })

            res.status(200).json({
                status: "success",
                message: "Deleted",
                data: post
            })
        } catch (error) {
            next(error)
        }
    },
}