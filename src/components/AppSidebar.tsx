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
    isActive ? "bg-white text-black font-medium" : "text-gray-300 hover:bg-gray-800 hover:text-white"

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-black border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/63298617-e599-4e14-b758-b99fb7b4c3e8.png" 
              alt="Centro Médico dos Olhos" 
              className="h-10 w-auto"
            />
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-white">EyeCare BI</h2>
                <p className="text-xs text-gray-300">Centro Médico</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Menu Principal</SidebarGroupLabel>
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