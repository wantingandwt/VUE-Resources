import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import indexHeader from '@/pages/indexHeader'
import index from '@/pages/index'
import material from '@/pages/material'
import materialmanage from '@/pages/materialmanage'
import materialDetails from '@/pages/materialDetails'

import resource from '@/pages/resource'
import resourcemanage from '@/pages/resourcemanage'
import resourceDetails from '@/pages/resourceDetails'

import task from '@/pages/task'
import taskmanage from '@/pages/taskmanage'
import taskDetails from '@/pages/taskDetails'

import teaching from '@/pages/teaching'
import teachingDetails from '@/pages/teachingDetails'

import card from '@/pages/card'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      name: 'indexHeader',
      component: indexHeader,
     // redirect:'/index',//默认选择第一个
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
          path: '/resourceDetails/:id',
          name: 'resourceDetails',
          component: resourceDetails,
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
          component: taskmanage,
        },
        {
          path: '/taskDetails/:id',
          name: 'taskDetails',
          component: taskDetails,
        },
        {
          path: '/teaching/:id',
          name: 'teaching',
          component: teaching
        },
        {
          path: '/teachingDetails/:id',
          name: 'teachingDetails',
          component: teachingDetails,
        },
        {
          path: '/card',
          name: 'card',
          component: card
        }
      ]
    }
   
  ]
})
