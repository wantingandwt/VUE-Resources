import Vue from 'vue'
import Router from 'vue-router'
import indexHeader from '@/pages/indexHeader'
import index from '@/pages/index'
import material from '@/pages/material'
import materialmanage from '@/pages/materialmanage'
import materialDetails from '@/pages/materialDetails'

import resource from '@/pages/resource'
import resourcemanage from '@/pages/resourcemanage'

import task from '@/pages/task'
import taskmanage from '@/pages/taskmanage'

import works from '@/pages/works'
import worksmanage from '@/pages/worksmanage'

import teaching from '@/pages/teaching'
import help from '@/pages/help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexHeader',
      component: indexHeader,
      redirect:'/index',//默认选择第一个
      children: [
        {
					path: '/index',
					component: index,
					name: 'index'
				},
        {
          path: '/material/:id',
          name: 'material',
          component: material,
        },
        {
          path: '/materialDetails/:id',
          name: 'materialDetails',
          component: materialDetails,
        },
        {
          path: '/materialmanage',
          name: 'materialmanage',
          component: materialmanage,
        },
        {
          path: '/resource/:id',
          name: 'resource',
          component: resource
        },
        {
          path: '/resourcemanage',
          name: 'resourcemanage',
          component: resourcemanage,
        },
        {
          path: '/task/:id',
          name: 'task',
          component: task
        },
        {
          path: '/taskmanage',
          name: 'taskmanage',
          component: resourcemanage,
        },
        {
          path: '/works/:id',
          name: 'works',
          component: works
        },
        {
          path: '/worksmanage',
          name: 'worksmanage',
          component: worksmanage
        },
        {
          path: '/teaching/:id',
          name: 'teaching',
          component: teaching
        },
        {
          path: '/help/:id',
          name: 'help',
          component: help
        }
      ]
    }
   
  ]
})
