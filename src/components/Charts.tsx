import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const examsData = [
  { month: 'Jan', exames: 120 },
  { month: 'Fev', exames: 135 },
  { month: 'Mar', exames: 149 },
  { month: 'Abr', exames: 162 },
  { month: 'Mai', exames: 156 },
  { month: 'Jun', exames: 178 },
]

const conditionsData = [
  { name: 'Miopia', value: 35, color: '#3B82F6' },
  { name: 'Catarata', value: 25, color: '#8B5CF6' },
  { name: 'Glaucoma', value: 20, color: '#F59E0B' },
  { name: 'Retinopatia', value: 15, color: '#EF4444' },
  { name: 'Outros', value: 5, color: '#6B7280' },
]

const weeklyData = [
  { day: 'Seg', consultas: 32, exames: 28 },
  { day: 'Ter', consultas: 35, exames: 31 },
  { day: 'Qua', consultas: 29, exames: 25 },
  { day: 'Qui', consultas: 38, exames: 34 },
  { day: 'Sex', consultas: 42, exames: 38 },
  { day: 'Sáb', consultas: 25, exames: 22 },
]

export function ExamsChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Exames por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={examsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="exames" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ConditionsChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Distribuição de Condições</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={conditionsData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {conditionsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function WeeklyChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Atividade Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="consultas" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Consultas"
            />
            <Line 
              type="monotone" 
              dataKey="exames" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="Exames"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}