import { Calendar, Clock, Plus, Search, Filter, Users, CheckCircle, XCircle } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const appointmentsData = [
  {
    id: "C001",
    patient: "Maria Silva Santos",
    doctor: "Dr. Carlos Mendoza",
    date: "2024-01-22",
    time: "09:00",
    type: "Consulta",
    status: "Confirmado",
    reason: "Acompanhamento miopia",
    duration: "30min"
  },
  {
    id: "C002",
    patient: "João Carlos Oliveira",
    doctor: "Dra. Ana Beatriz",
    date: "2024-01-22",
    time: "10:30",
    type: "Retorno",
    status: "Confirmado", 
    reason: "Tratamento glaucoma",
    duration: "45min"
  },
  {
    id: "C003",
    patient: "Ana Paula Costa",
    doctor: "Dr. Roberto Silva", 
    date: "2024-01-22",
    time: "14:00",
    type: "Primeira consulta",
    status: "Aguardando",
    reason: "Dor ocular",
    duration: "60min"
  },
  {
    id: "C004",
    patient: "Roberto Ferreira",
    doctor: "Dr. Carlos Mendoza",
    date: "2024-01-22",
    time: "15:30",
    type: "Pré-operatório",
    status: "Reagendado",
    reason: "Cirurgia catarata",
    duration: "45min"
  },
  {
    id: "C005", 
    patient: "Patricia Lima",
    doctor: "Dra. Ana Beatriz",
    date: "2024-01-23",
    time: "08:30",
    type: "Consulta",
    status: "Confirmado",
    reason: "Check-up anual",
    duration: "30min"
  }
]

const todaySchedule = appointmentsData.filter(apt => apt.date === "2024-01-22")
const upcomingSchedule = appointmentsData.filter(apt => apt.date > "2024-01-22")

const Appointments = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Agenda de Consultas</h1>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nova Consulta
            </Button>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="today" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Hoje</TabsTrigger>
                <TabsTrigger value="upcoming">Próximas</TabsTrigger>
                <TabsTrigger value="calendar">Calendário</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="space-y-6">
                {/* Today's Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{todaySchedule.length}</div>
                      <p className="text-xs text-muted-foreground">22 de Janeiro</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {todaySchedule.filter(apt => apt.status === "Confirmado").length}
                      </div>
                      <p className="text-xs text-muted-foreground">Prontas</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Aguardando</CardTitle>
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-yellow-600">
                        {todaySchedule.filter(apt => apt.status === "Aguardando").length}
                      </div>
                      <p className="text-xs text-muted-foreground">Confirmação</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Reagendadas</CardTitle>
                      <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">
                        {todaySchedule.filter(apt => apt.status === "Reagendado").length}
                      </div>
                      <p className="text-xs text-muted-foreground">Hoje</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Schedule */}
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda de Hoje - 22 de Janeiro</CardTitle>
                    <CardDescription>Consultas programadas para hoje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Horário</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Motivo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {todaySchedule.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div>{appointment.time}</div>
                                <div className="text-sm text-muted-foreground">{appointment.duration}</div>
                              </div>
                            </TableCell>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.type}</TableCell>
                            <TableCell>{appointment.reason}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  appointment.status === "Confirmado" ? "default" : 
                                  appointment.status === "Aguardando" ? "secondary" : 
                                  "destructive"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">Iniciar</Button>
                                <Button variant="outline" size="sm">Reagendar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Próximas Consultas</CardTitle>
                    <CardDescription>Consultas agendadas para os próximos dias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Buscar por paciente ou médico..." className="pl-8" />
                        </div>
                      </div>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Appointments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Agenda Futura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data/Hora</TableHead>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Motivo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {upcomingSchedule.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{appointment.date}</div>
                                <div className="text-sm text-muted-foreground">{appointment.time}</div>
                              </div>
                            </TableCell>
                            <TableCell>{appointment.patient}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.type}</TableCell>
                            <TableCell>{appointment.reason}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{appointment.status}</Badge>
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

              <TabsContent value="calendar" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visão de Calendário</CardTitle>
                    <CardDescription>Visualização mensal da agenda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <Calendar className="h-12 w-12 mx-auto mb-4" />
                      <p>Calendário interativo em desenvolvimento</p>
                      <p className="text-sm">Em breve: visualização mensal completa</p>
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

export default Appointments;