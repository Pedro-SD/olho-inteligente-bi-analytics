import { Eye, Calendar, Clock, FileText, Plus, Search, Filter } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const examsData = [
  {
    id: "EX001",
    patient: "Maria Silva Santos",
    type: "Tonometria",
    date: "2024-01-15",
    time: "14:30",
    doctor: "Dr. Carlos Mendoza",
    status: "Concluído",
    result: "Pressão ocular normal",
    priority: "Normal"
  },
  {
    id: "EX002",
    patient: "João Carlos Oliveira", 
    type: "Campo Visual",
    date: "2024-01-16",
    time: "09:15",
    doctor: "Dra. Ana Beatriz",
    status: "Concluído",
    result: "Defeito glaucomatoso",
    priority: "Alta"
  },
  {
    id: "EX003",
    patient: "Ana Paula Costa",
    type: "Refração",
    date: "2024-01-17",
    time: "16:00", 
    doctor: "Dr. Roberto Silva",
    status: "Agendado",
    result: "-",
    priority: "Normal"
  },
  {
    id: "EX004",
    patient: "Roberto Ferreira",
    type: "Biomicroscopia",
    date: "2024-01-18",
    time: "10:45",
    doctor: "Dr. Carlos Mendoza",
    status: "Em andamento",
    result: "Parcial: opacidade cristaliniana",
    priority: "Alta"
  }
]

const examTypes = [
  { name: "Refração", count: 89, description: "Medição de grau" },
  { name: "Tonometria", count: 67, description: "Pressão ocular" },
  { name: "Campo Visual", count: 45, description: "Defeitos visuais" },
  { name: "Biomicroscopia", count: 34, description: "Exame com lupa" },
  { name: "Fundoscopia", count: 28, description: "Fundo de olho" },
  { name: "OCT", count: 23, description: "Tomografia óptica" }
]

const Exams = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Gestão de Exames</h1>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Agendar Exame
            </Button>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="schedule">Agenda</TabsTrigger>
                <TabsTrigger value="results">Resultados</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Exames Hoje</CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">18</div>
                      <p className="text-xs text-muted-foreground">+2 que ontem</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">127</div>
                      <p className="text-xs text-muted-foreground">92% da meta</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24min</div>
                      <p className="text-xs text-muted-foreground">-3min que antes</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Laudos Pendentes</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">7</div>
                      <p className="text-xs text-muted-foreground">Para revisar</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Exam Types */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tipos de Exames</CardTitle>
                    <CardDescription>Distribuição por tipo este mês</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {examTypes.map((exam) => (
                        <div key={exam.name} className="border rounded-lg p-4">
                          <div className="text-2xl font-bold text-primary">{exam.count}</div>
                          <div className="font-medium">{exam.name}</div>
                          <div className="text-sm text-muted-foreground">{exam.description}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda de Exames</CardTitle>
                    <CardDescription>Visualize e gerencie os exames agendados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Buscar por paciente ou tipo de exame..." className="pl-8" />
                        </div>
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Exams Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Exames</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Data/Hora</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Prioridade</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examsData.map((exam) => (
                          <TableRow key={exam.id}>
                            <TableCell className="font-medium">{exam.id}</TableCell>
                            <TableCell>{exam.patient}</TableCell>
                            <TableCell>{exam.type}</TableCell>
                            <TableCell>
                              <div>
                                <div>{exam.date}</div>
                                <div className="text-sm text-muted-foreground">{exam.time}</div>
                              </div>
                            </TableCell>
                            <TableCell>{exam.doctor}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  exam.status === "Concluído" ? "default" : 
                                  exam.status === "Em andamento" ? "secondary" : 
                                  "outline"
                                }
                              >
                                {exam.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={exam.priority === "Alta" ? "destructive" : "outline"}>
                                {exam.priority}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Ver</Button>
                                <Button variant="outline" size="sm">Editar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados de Exames</CardTitle>
                    <CardDescription>Laudos e resultados dos exames realizados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Exame</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Resultado</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {examsData.filter(exam => exam.status === "Concluído").map((exam) => (
                          <TableRow key={exam.id}>
                            <TableCell>{exam.type}</TableCell>
                            <TableCell>{exam.patient}</TableCell>
                            <TableCell>{exam.date}</TableCell>
                            <TableCell>{exam.result}</TableCell>
                            <TableCell>
                              <Badge variant="default">Laudo Disponível</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Laudo
                                </Button>
                                <Button variant="outline" size="sm">Enviar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default Exams;