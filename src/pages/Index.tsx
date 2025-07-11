import { Users, Eye, Calendar, TrendingUp, Brain, Clock } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { PatientTable } from "@/components/PatientTable"
import { AIAnalysisPanel } from "@/components/AIAnalysisPanel"
import { ExamsChart, ConditionsChart, WeeklyChart } from "@/components/Charts"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <header className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold">Dashboard Principal</h1>
                <p className="text-sm text-muted-foreground">Centro Médico dos Olhos - BI Inteligente</p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total de Pacientes"
                value="1,247"
                icon={<Users className="h-5 w-5" />}
                trend={{ value: "12%", isPositive: true }}
              />
              <MetricCard
                title="Exames Realizados"
                value="432"
                icon={<Eye className="h-5 w-5" />}
                trend={{ value: "8%", isPositive: true }}
              />
              <MetricCard
                title="Consultas Agendadas"
                value="89"
                icon={<Calendar className="h-5 w-5" />}
                trend={{ value: "5%", isPositive: false }}
              />
              <MetricCard
                title="Taxa de Precisão IA"
                value="94.2%"
                icon={<Brain className="h-5 w-5" />}
                trend={{ value: "2.1%", isPositive: true }}
              />
            </div>

            {/* Análise de IA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AIAnalysisPanel />
              <div className="space-y-6">
                <ConditionsChart />
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExamsChart />
              <WeeklyChart />
            </div>

            {/* Tabela de Pacientes */}
            <PatientTable />

            {/* Cards de Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Tempo Médio de Espera"
                value="15 min"
                icon={<Clock className="h-5 w-5" />}
                className="bg-gradient-secondary"
              />
              <MetricCard
                title="Satisfação do Paciente"
                value="4.8/5"
                icon={<TrendingUp className="h-5 w-5" />}
                trend={{ value: "0.3", isPositive: true }}
                className="bg-gradient-secondary"
              />
              <MetricCard
                title="Diagnósticos IA"
                value="156"
                icon={<Brain className="h-5 w-5" />}
                trend={{ value: "23%", isPositive: true }}
                className="bg-gradient-secondary"
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
