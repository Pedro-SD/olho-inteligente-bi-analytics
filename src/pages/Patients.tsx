import { Users, Search, Plus, Filter, Calendar, Phone, Mail, Eye } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const patientsData = [
  {
    id: "001",
    name: "Maria Silva Santos",
    age: 45,
    phone: "(11) 99999-1234",
    email: "maria.silva@email.com",
    lastExam: "2024-01-15",
    condition: "Miopia",
    status: "Ativo",
    nextAppointment: "2024-02-20"
  },
  {
    id: "002", 
    name: "João Carlos Oliveira",
    age: 62,
    phone: "(11) 99888-5678",
    email: "joao.carlos@email.com",
    lastExam: "2024-01-10",
    condition: "Glaucoma",
    status: "Em tratamento",
    nextAppointment: "2024-02-15"
  },
  {
    id: "003",
    name: "Ana Paula Costa",
    age: 34,
    phone: "(11) 99777-9012",
    email: "ana.paula@email.com", 
    lastExam: "2024-01-20",
    condition: "Astigmatismo",
    status: "Ativo",
    nextAppointment: "2024-03-10"
  },
  {
    id: "004",
    name: "Roberto Ferreira",
    age: 58,
    phone: "(11) 99666-3456",
    email: "roberto.f@email.com",
    lastExam: "2024-01-08",
    condition: "Catarata",
    status: "Pré-cirúrgico",
    nextAppointment: "2024-02-25"
  }
]

const Patients = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Gestão de Pacientes</h1>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+12% este mês</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Em Tratamento</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Ativos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próximas Consultas</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Buscar Pacientes</CardTitle>
                <CardDescription>Encontre pacientes por nome, condição ou status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar por nome, email ou telefone..." className="pl-8" />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Patients Table */}
            <Card>
              <CardHeader>
                <CardTitle>Lista de Pacientes</CardTitle>
                <CardDescription>Gerencie informações e histórico dos pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Último Exame</TableHead>
                      <TableHead>Condição</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Próxima Consulta</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientsData.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">{patient.age} anos</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {patient.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.lastExam}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{patient.condition}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={patient.status === "Ativo" ? "default" : patient.status === "Em tratamento" ? "secondary" : "destructive"}
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.nextAppointment}</TableCell>
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Patients;