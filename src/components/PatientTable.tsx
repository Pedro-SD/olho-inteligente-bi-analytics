import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  lastExam: string
  condition: string
  riskLevel: "low" | "medium" | "high"
  nextAppointment: string
}

const mockPatients: Patient[] = [
  {
    id: "001",
    name: "Maria Silva",
    age: 65,
    lastExam: "2024-01-10",
    condition: "Catarata",
    riskLevel: "medium",
    nextAppointment: "2024-01-25"
  },
  {
    id: "002", 
    name: "João Santos",
    age: 45,
    lastExam: "2024-01-08",
    condition: "Glaucoma",
    riskLevel: "high",
    nextAppointment: "2024-01-20"
  },
  {
    id: "003",
    name: "Ana Costa",
    age: 32,
    lastExam: "2024-01-12",
    condition: "Miopia",
    riskLevel: "low",
    nextAppointment: "2024-02-15"
  },
  {
    id: "004",
    name: "Carlos Oliveira",
    age: 58,
    lastExam: "2024-01-05",
    condition: "Retinopatia",
    riskLevel: "high",
    nextAppointment: "2024-01-18"
  }
]

const getRiskBadgeVariant = (risk: string) => {
  switch (risk) {
    case "high": return "destructive"
    case "medium": return "secondary"
    case "low": return "outline"
    default: return "outline"
  }
}

export function PatientTable() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pacientes Recentes</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar pacientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Último Exame</TableHead>
              <TableHead>Condição</TableHead>
              <TableHead>Risco</TableHead>
              <TableHead>Próxima Consulta</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age} anos</TableCell>
                <TableCell>{new Date(patient.lastExam).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>
                    {patient.riskLevel === "high" ? "Alto" : 
                     patient.riskLevel === "medium" ? "Médio" : "Baixo"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(patient.nextAppointment).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}