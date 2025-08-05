import { FileText, Download, Calendar, TrendingUp, Users, Eye, Filter } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const reportsData = [
  {
    id: "REL001",
    title: "Relatório Mensal de Exames",
    type: "Operacional",
    period: "Janeiro 2024",
    generatedBy: "Sistema",
    date: "2024-01-31",
    status: "Concluído",
    size: "2.3 MB",
    format: "PDF"
  },
  {
    id: "REL002", 
    title: "Análise de Pacientes por Faixa Etária",
    type: "Demográfico",
    period: "Q4 2023",
    generatedBy: "Dra. Ana Beatriz",
    date: "2024-01-15",
    status: "Concluído",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: "REL003",
    title: "Performance dos Médicos",
    type: "RH",
    period: "Janeiro 2024",
    generatedBy: "Administração",
    date: "2024-01-30",
    status: "Em processamento",
    size: "-",
    format: "PDF"
  },
  {
    id: "REL004",
    title: "Faturamento por Convênio",
    type: "Financeiro",
    period: "Janeiro 2024", 
    generatedBy: "Financeiro",
    date: "2024-01-31",
    status: "Concluído",
    size: "3.1 MB",
    format: "Excel"
  }
]

const quickReports = [
  { name: "Exames por Tipo", description: "Distribuição dos exames realizados", icon: Eye },
  { name: "Pacientes Ativos", description: "Lista de pacientes em tratamento", icon: Users },
  { name: "Faturamento Mensal", description: "Resumo financeiro do período", icon: TrendingUp },
  { name: "Agendamentos", description: "Relatório de consultas agendadas", icon: Calendar }
]

const Reports = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Relatórios</h1>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Gerar Relatório
            </Button>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="generated" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generated">Relatórios Gerados</TabsTrigger>
                <TabsTrigger value="quick">Relatórios Rápidos</TabsTrigger>
                <TabsTrigger value="custom">Personalizado</TabsTrigger>
              </TabsList>

              <TabsContent value="generated" className="space-y-6">
                {/* Reports Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Relatórios</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">47</div>
                      <p className="text-xs text-muted-foreground">Este mês</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">156</div>
                      <p className="text-xs text-muted-foreground">+23% que antes</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Processando</CardTitle>
                      <TrendingUp className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">3</div>
                      <p className="text-xs text-muted-foreground">Em fila</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tamanho Total</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">127 MB</div>
                      <p className="text-xs text-muted-foreground">Arquivos gerados</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Filtros</CardTitle>
                    <CardDescription>Encontre relatórios específicos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Tipo de relatório" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="operational">Operacional</SelectItem>
                          <SelectItem value="financial">Financeiro</SelectItem>
                          <SelectItem value="demographic">Demográfico</SelectItem>
                          <SelectItem value="hr">RH</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="week">Esta semana</SelectItem>
                          <SelectItem value="month">Este mês</SelectItem>
                          <SelectItem value="quarter">Trimestre</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Aplicar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reports Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios Disponíveis</CardTitle>
                    <CardDescription>Histórico de relatórios gerados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Relatório</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Período</TableHead>
                          <TableHead>Gerado por</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportsData.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{report.title}</div>
                                <div className="text-sm text-muted-foreground">
                                  {report.size} • {report.format}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{report.type}</Badge>
                            </TableCell>
                            <TableCell>{report.period}</TableCell>
                            <TableCell>{report.generatedBy}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  report.status === "Concluído" ? "default" : 
                                  "secondary"
                                }
                              >
                                {report.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {report.status === "Concluído" && (
                                  <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">Ver</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="quick" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios Rápidos</CardTitle>
                    <CardDescription>Gere relatórios predefinidos em segundos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {quickReports.map((report) => (
                        <div key={report.name} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <report.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{report.name}</h3>
                              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
                              <Button size="sm" className="w-full">
                                Gerar Relatório
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatório Personalizado</CardTitle>
                    <CardDescription>Configure relatórios específicos para suas necessidades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <FileText className="h-12 w-12 mx-auto mb-4" />
                      <p>Construtor de relatórios em desenvolvimento</p>
                      <p className="text-sm">Em breve: interface para criação de relatórios personalizados</p>
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

export default Reports;