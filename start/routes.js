'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')
//show posts pages
Route.get('/posts', 'PostController.index')

//show add post page
Route.get('/posts/add', 'PostController.add')

//add a new post
Route.post('/posts', 'PostController.store')

//show edit page
Route.get('/posts/:id/edit', 'PostController.edit')

//update post
Route.put('/posts/:id', 'PostController.update')

//delete post
Route.delete('/posts/:id', 'PostController.destroy')


//show post details page
Route.get('/posts/:id', 'PostController.details')
