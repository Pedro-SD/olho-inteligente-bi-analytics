import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dados para Ticket Médio por Aparelho
const ticketAparelhoData = [
  { aparelho: 'OCT', ticketMedio: 850, volume: 45 },
  { aparelho: 'Campimetria', ticketMedio: 320, volume: 78 },
  { aparelho: 'Retinografia', ticketMedio: 280, volume: 92 },
  { aparelho: 'Biometria', ticketMedio: 180, volume: 134 },
  { aparelho: 'Tonometria', ticketMedio: 120, volume: 156 },
]

// Dados para Volume por Plano
const volumePlanoData = [
  { plano: 'Particular', volume: 35, cor: '#3B82F6' },
  { plano: 'Unimed', volume: 28, cor: '#10B981' },
  { plano: 'Bradesco', volume: 15, cor: '#F59E0B' },
  { plano: 'SulAmérica', volume: 12, cor: '#8B5CF6' },
  { plano: 'Outros', volume: 10, cor: '#6B7280' },
]

// Dados para Faturamento por Exame
const faturamentoExameData = [
  { mes: 'Jan', oct: 38250, campimetria: 24960, retinografia: 25760, biometria: 24120 },
  { mes: 'Fev', oct: 42500, campimetria: 27840, retinografia: 28560, biometria: 26820 },
  { mes: 'Mar', oct: 45900, campimetria: 31200, retinografia: 31920, biometria: 29480 },
  { mes: 'Abr', oct: 51000, campimetria: 34080, retinografia: 35280, biometria: 32640 },
]

// Dados para Tempo de Atendimento
const tempoAtendimentoData = [
  { dia: 'Seg', tempoMedio: 25, pacientes: 45 },
  { dia: 'Ter', tempoMedio: 22, pacientes: 52 },
  { dia: 'Qua', tempoMedio: 28, pacientes: 38 },
  { dia: 'Qui', tempoMedio: 24, pacientes: 48 },
  { dia: 'Sex', tempoMedio: 26, pacientes: 55 },
  { dia: 'Sáb', tempoMedio: 18, pacientes: 28 },
]

// Dados para Faturamento por Médico
const faturamentoMedicoData = [
  { medico: 'Dr. Silva', faturamento: 125000, pacientes: 240 },
  { medico: 'Dra. Santos', faturamento: 98000, pacientes: 190 },
  { medico: 'Dr. Costa', faturamento: 87000, pacientes: 165 },
  { medico: 'Dra. Oliveira', faturamento: 112000, pacientes: 220 },
]

export function TicketMedioChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Ticket Médio por Aparelho</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={ticketAparelhoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="aparelho" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => [
                name === 'ticketMedio' ? `R$ ${value}` : value,
                name === 'ticketMedio' ? 'Ticket Médio' : 'Volume'
              ]}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="ticketMedio" fill="hsl(var(--primary))" name="Ticket Médio (R$)" />
            <Line yAxisId="right" type="monotone" dataKey="volume" stroke="hsl(var(--destructive))" name="Volume" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function VolumePlanoChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Volume por Plano de Saúde</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={volumePlanoData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="volume"
              label={({ plano, volume }) => `${plano}: ${volume}%`}
            >
              {volumePlanoData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function FaturamentoExameChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Faturamento por Tipo de Exame</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={faturamentoExameData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, '']} />
            <Legend />
            <Bar dataKey="oct" stackId="a" fill="#3B82F6" name="OCT" />
            <Bar dataKey="campimetria" stackId="a" fill="#10B981" name="Campimetria" />
            <Bar dataKey="retinografia" stackId="a" fill="#F59E0B" name="Retinografia" />
            <Bar dataKey="biometria" stackId="a" fill="#8B5CF6" name="Biometria" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function TempoAtendimentoChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Tempo de Atendimento Semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={tempoAtendimentoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="pacientes" fill="hsl(var(--muted))" name="Nº Pacientes" />
            <Line yAxisId="left" type="monotone" dataKey="tempoMedio" stroke="hsl(var(--primary))" strokeWidth={3} name="Tempo Médio (min)" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function FaturamentoMedicoChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Performance por Médico</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faturamentoMedicoData.map((medico, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium">{medico.medico}</h4>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="secondary">{medico.pacientes} pacientes</Badge>
                  <span className="text-sm text-muted-foreground">
                    Ticket médio: R$ {(medico.faturamento / medico.pacientes).toFixed(0)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  R$ {medico.faturamento.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Faturamento</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}