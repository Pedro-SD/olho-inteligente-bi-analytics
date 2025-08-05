import { TrendingUp, BarChart3, PieChart, Activity, Users, Eye, DollarSign, Clock } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Analytics Avançado</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Última atualização: há 5 min</Badge>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="trends">Tendências</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="predictions">Predições</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">+15.2%</div>
                      <p className="text-xs text-muted-foreground">vs mês anterior</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Eficiência Operacional</CardTitle>
                      <Activity className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87.4%</div>
                      <Progress value={87.4} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
                      <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.8/5.0</div>
                      <p className="text-xs text-muted-foreground">Baseado em 347 avaliações</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ROI</CardTitle>
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">234%</div>
                      <p className="text-xs text-muted-foreground">Retorno sobre investimento</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Conversion Funnel */}
                <Card>
                  <CardHeader>
                    <CardTitle>Funil de Conversão</CardTitle>
                    <CardDescription>Jornada do paciente desde o primeiro contato</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stage: "Contato Inicial", count: 1000, rate: 100 },
                        { stage: "Agendamento", count: 780, rate: 78 },
                        { stage: "Primeira Consulta", count: 720, rate: 72 },
                        { stage: "Exames Realizados", count: 650, rate: 65 },
                        { stage: "Tratamento Iniciado", count: 520, rate: 52 },
                        { stage: "Follow-up Completado", count: 450, rate: 45 }
                      ].map((stage, index) => (
                        <div key={stage.stage} className="flex items-center gap-4">
                          <div className="w-48 text-sm font-medium">{stage.stage}</div>
                          <div className="flex-1">
                            <Progress value={stage.rate} className="h-3" />
                          </div>
                          <div className="w-16 text-sm text-right">{stage.count}</div>
                          <div className="w-12 text-sm text-muted-foreground text-right">{stage.rate}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Department Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance por Departamento</CardTitle>
                      <CardDescription>Métricas de eficiência por área</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { dept: "Oftalmologia Geral", score: 92, trend: "+5%" },
                          { dept: "Cirurgia Refrativa", score: 88, trend: "+8%" },
                          { dept: "Retina", score: 95, trend: "+2%" },
                          { dept: "Glaucoma", score: 89, trend: "+12%" },
                          { dept: "Pediatria", score: 91, trend: "+3%" }
                        ].map((dept) => (
                          <div key={dept.dept} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{dept.dept}</div>
                              <Progress value={dept.score} className="mt-1" />
                            </div>
                            <div className="ml-4 text-right">
                              <div className="font-bold">{dept.score}%</div>
                              <div className="text-sm text-green-600">{dept.trend}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Métricas Operacionais</CardTitle>
                      <CardDescription>Indicadores chave de desempenho</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Tempo Médio de Espera</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">18 min</div>
                            <div className="text-xs text-green-600">-12% vs meta</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Exames por Dia</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">127</div>
                            <div className="text-xs text-green-600">+8% vs meta</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Taxa de Ocupação</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">84%</div>
                            <div className="text-xs text-muted-foreground">Meta: 80%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Produtividade Médica</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">94%</div>
                            <div className="text-xs text-green-600">+6% vs meta</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Tendências</CardTitle>
                    <CardDescription>Padrões e tendências identificadas nos dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                      <p>Análise de tendências em desenvolvimento</p>
                      <p className="text-sm">Em breve: gráficos interativos e previsões</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Performance</CardTitle>
                    <CardDescription>Métricas detalhadas de desempenho operacional</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                      <p>Dashboard de performance em desenvolvimento</p>
                      <p className="text-sm">Em breve: análises comparativas e benchmarks</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Predições e Forecasting</CardTitle>
                    <CardDescription>Previsões baseadas em machine learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <PieChart className="h-12 w-12 mx-auto mb-4" />
                      <p>Módulo de predições em desenvolvimento</p>
                      <p className="text-sm">Em breve: previsões de demanda e capacidade</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;