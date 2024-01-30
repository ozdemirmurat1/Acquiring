export class Navigation{
    routerLink: string = "";
    name: string = "";
    icon: string = "";
}

export const Navigations: Navigation[] = [
    {
        routerLink: "/",
        name:"Ana Sayfa",
        icon:"fa fa-home"
    },
    {
        routerLink: "/chains",
        name:"İş Yerleri",
        icon:"fa fa-file-signature"
    },
    {
        routerLink: "/merchants",
        name:"Üye İş Yerleri",
        icon:"fa fa-book-open"
    },
    {
        routerLink: "/terminals",
        name:"Terminaller",
        icon:"fa fa-chart-pie"
    },
    {
        routerLink: "/logs",
        name:"Log Kayıtları",
        icon:"fa fa-chalkboard-user"
    }
]