import { createRouter, createWebHashHistory } from "vue-router";  

const routes =  [
    {
        name: "HomePage",
        path: "/",
        // component: HomePage
        component: () => import("@/views/HomePage")
    },
    {
        name: "NewCustomer",
        path: "/newCustomer", 
        component: () => import("@/views/NewCustomer")
    },
    {
        name: "NewCustomerUpdate",
        path: "/newCustomer/:customerId", 
        component: () => import("@/views/NewCustomer")
    },
    {
        name: "MeterList",
        path: "/meterList/:customerId/:siteId/:siteIndex", 
        component: () => import("@/views/MeterList")
    },
    {
        name: "NewCircuit",
        path: "/newCircuit/:customerId/:siteId/:meterId/:siteIndex/:meterIndex", 
        component: () => import("@/views/NewCircuit")
    },
    {
        name: "NewCircuitUpdate",
        path: "/newCircuit/:customerId/:siteId/:meterId/:siteIndex/:meterIndex/:circuitIndex", 
        component: () => import("@/views/NewCircuit")
    }
]

const router = createRouter({
    routes: routes,
    // history: createWebHistory()
    history: createWebHashHistory()
})

export default router