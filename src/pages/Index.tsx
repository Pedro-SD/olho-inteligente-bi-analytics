import { Users, Eye, Calendar, TrendingUp, Brain, Clock, DollarSign, Target, Activity } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { PatientTable } from "@/components/PatientTable"
import { AIAnalysisPanel } from "@/components/AIAnalysisPanel"
import { ExamsChart, ConditionsChart, WeeklyChart } from "@/components/Charts"
import { TicketMedioChart, VolumePlanoChart, FaturamentoExameChart, TempoAtendimentoChart, FaturamentoMedicoChart } from "@/components/BusinessCharts"
import { FaturamentoIdadeChart, FaturamentoCidadeChart, TempoIdadeChart, PagamentoChart } from "@/components/PersonaCharts"
import { ContasReceberDashboard, FluxoDiarioChart, EvolucaoFinanceiraChart, FinanceiroActions } from "@/components/FinanceiroCharts"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header com Logo */}
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <img 
                src="/lovable-uploads/bb409d3e-cbd2-41b1-af18-edc0553339ef.png" 
                alt="Centro Médico dos Olhos" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold">Business Intelligence</h1>
                <p className="text-sm text-muted-foreground">Centro Médico dos Olhos - Dashboard Completo</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="business">BI Operacional</TabsTrigger>
                <TabsTrigger value="personas">Personas & Público</TabsTrigger>
                <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
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
                    title="Faturamento Mensal"
                    value="R$ 356.000"
                    icon={<DollarSign className="h-5 w-5" />}
                    trend={{ value: "15%", isPositive: true }}
                  />
                  <MetricCard
                    title="Taxa de Precisão IA"
                    value="94.2%"
                    icon={<Brain className="h-5 w-5" />}
                    trend={{ value: "2.1%", isPositive: true }}
                  />
                </div>

                {/* Análise de IA e Condições */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AIAnalysisPanel />
                  <ConditionsChart />
                </div>

                {/* Gráficos Gerais */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ExamsChart />
                  <WeeklyChart />
                </div>

                {/* Tabela de Pacientes */}
                <PatientTable />
              </TabsContent>

              <TabsContent value="business" className="space-y-6">
                {/* Métricas de Negócio */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    title="Ticket Médio Geral"
                    value="R$ 285"
                    icon={<Target className="h-5 w-5" />}
                    trend={{ value: "5%", isPositive: true }}
                  />
                  <MetricCard
                    title="Volume Total"
                    value="505"
                    icon={<Activity className="h-5 w-5" />}
                    trend={{ value: "12%", isPositive: true }}
                  />
                  <MetricCard
                    title="Tempo Médio"
                    value="24 min"
                    icon={<Clock className="h-5 w-5" />}
                    trend={{ value: "8%", isPositive: false }}
                  />
                  <MetricCard
                    title="Faturamento/Médico"
                    value="R$ 105.500"
                    icon={<DollarSign className="h-5 w-5" />}
                    trend={{ value: "7%", isPositive: true }}
                  />
                </div>

                {/* Gráficos de Negócio */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TicketMedioChart />
                  <VolumePlanoChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FaturamentoExameChart />
                  <TempoAtendimentoChart />
                </div>

                <FaturamentoMedicoChart />
              </TabsContent>

              <TabsContent value="personas" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FaturamentoIdadeChart />
                  <FaturamentoCidadeChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TempoIdadeChart />
                  <PagamentoChart />
                </div>
              </TabsContent>

              <TabsContent value="financeiro" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <ContasReceberDashboard />
                  </div>
                  <FinanceiroActions />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FluxoDiarioChart />
                  <EvolucaoFinanceiraChart />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
