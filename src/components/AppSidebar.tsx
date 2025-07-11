import { Eye, BarChart3, Users, Calendar, Brain, Settings, FileText, TrendingUp } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: BarChart3 },
  { title: "Pacientes", url: "/patients", icon: Users },
  { title: "Exames", url: "/exams", icon: Eye },
  { title: "Consultas", url: "/appointments", icon: Calendar },
  { title: "IA Diagnóstico", url: "/ai-diagnosis", icon: Brain },
  { title: "Relatórios", url: "/reports", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: TrendingUp },
  { title: "Configurações", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent/50"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Eye className="h-8 w-8 text-primary" />
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">EyeCare BI</h2>
                <p className="text-xs text-muted-foreground">Centro Médico</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}