import { NavLink, useLocation } from "react-router-dom";
import { 
  User, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Briefcase, 
  MessageSquare,
  BarChart3,
  Home
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Profile & Skills", url: "/profile", icon: User },
  { title: "Career Paths", url: "/careers", icon: Target },
  { title: "Upskilling Hub", url: "/learning", icon: BookOpen },
  { title: "Progress Tracker", url: "/progress", icon: TrendingUp },
  { title: "Market Insights", url: "/insights", icon: BarChart3 },
  { title: "AI Assistant", url: "/chat", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const baseClass = "transition-all duration-200 hover:bg-accent/50";
    return isActive(path) 
      ? `${baseClass} bg-primary/10 text-primary border-r-2 border-primary font-medium` 
      : baseClass;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="border-r border-border bg-card/50">
        <div className="p-6 border-b border-border">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-lg">CareerAI</h1>
                <p className="text-xs text-muted-foreground">Skills Advisor</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClass(item.url)}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="p-3 rounded-lg bg-gradient-primary text-white text-sm">
              <div className="font-medium mb-1">Upgrade to Pro</div>
              <div className="text-xs opacity-90">
                Unlock advanced AI insights and personalized career coaching
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}