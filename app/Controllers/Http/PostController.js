'use strict'
//Post Model
const Post = use('App/Models/Post');
//validator
const { validate } = use('Validator')

class PostController {
    async index({ view }) {
        const posts = await Post.all()
        return view.render('posts.index', {
            title: "Lastest Posts",
            posts: posts.toJSON()
        })
    }

    async details({params, view}) {
        const post = await Post.find(params.id)
        return view.render('posts.details', {
            post
        })
    }

    async add({ view }) {
        return view.render('posts.add')
    }

    async store({request, response, session}) {
        //validate post data
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:100',
            body: 'required|min:3'
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }
        const post = await new Post()
        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({notification: "Post added sucessfully"})

        return response.redirect('/posts')
    }

    async edit({ params, view }) {
        const post = await Post.find(params.id);
        return view.render('posts.edit', {
            post
        })
    }

    async update({ params, request, response, session }) {
        //validate post data
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:100',
            body: 'required|min:3'
        })

        if(validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const post = await Post.find(params.id)
        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({notification: 'Post updated successfully'})

        return response.redirect('/posts')
    }

    async destroy({params, response, session}) {
        const post = await Post.find(params.id)
        post.delete()

        session.flash({notification: "Post deleted successufully"});

        return response.redirect('/posts')
    }
}

module.exports = PostController
