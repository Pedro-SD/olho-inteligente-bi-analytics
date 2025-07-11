import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from 'lucide-react'

// Dados para Faturamento por Idade
const faturamentoIdadeData = [
  { faixa: '0-18', faturamento: 45000, pacientes: 120 },
  { faixa: '19-35', faturamento: 78000, pacientes: 180 },
  { faixa: '36-50', faturamento: 125000, pacientes: 220 },
  { faixa: '51-65', faturamento: 165000, pacientes: 280 },
  { faixa: '65+', faturamento: 187000, pacientes: 320 },
]

// Dados para Faturamento por Cidade
const faturamentoCidadeData = [
  { cidade: 'São Paulo', faturamento: 280000, participacao: 45 },
  { cidade: 'Guarulhos', faturamento: 120000, participacao: 19 },
  { cidade: 'Osasco', faturamento: 95000, participacao: 15 },
  { cidade: 'Barueri', faturamento: 78000, participacao: 13 },
  { cidade: 'Outras', faturamento: 50000, participacao: 8 },
]

// Dados para Tempo de Atendimento por Idade
const tempoIdadeData = [
  { faixa: '0-18', tempo: 18, satisfacao: 4.8 },
  { faixa: '19-35', tempo: 22, satisfacao: 4.6 },
  { faixa: '36-50', tempo: 25, satisfacao: 4.5 },
  { faixa: '51-65', tempo: 28, satisfacao: 4.3 },
  { faixa: '65+', tempo: 35, satisfacao: 4.2 },
]

// Dados para Formas de Pagamento
const pagamentoData = [
  { forma: 'Plano de Saúde', valor: 65, cor: '#3B82F6' },
  { forma: 'Particular', valor: 25, cor: '#10B981' },
  { forma: 'Cartão Crédito', valor: 8, cor: '#F59E0B' },
  { forma: 'PIX', valor: 2, cor: '#8B5CF6' },
]

const cores = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280']

export function FaturamentoIdadeChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Faturamento por Faixa Etária</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={faturamentoIdadeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faixa" />
            <YAxis tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'faturamento' ? `R$ ${value.toLocaleString()}` : value,
                name === 'faturamento' ? 'Faturamento' : 'Pacientes'
              ]}
            />
            <Bar dataKey="faturamento" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {faturamentoIdadeData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium">{item.faixa}</div>
              <div className="text-xs text-muted-foreground">{item.pacientes} pac.</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function FaturamentoCidadeChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Faturamento por Cidade</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faturamentoCidadeData.map((cidade, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: cores[index] }}
                />
                <span className="font-medium">{cidade.cidade}</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{cidade.participacao}%</Badge>
                <span className="text-lg font-bold text-primary">
                  R$ {cidade.faturamento.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={faturamentoCidadeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="participacao"
              >
                {faturamentoCidadeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function TempoIdadeChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Tempo de Atendimento por Idade</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tempoIdadeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faixa" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[4.0, 5.0]} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'tempo' ? `${value} min` : `${value}/5`,
                name === 'tempo' ? 'Tempo Médio' : 'Satisfação'
              ]}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="tempo" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={3}
              name="Tempo (min)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="satisfacao" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              name="Satisfação"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">
            💡 <strong>Insight:</strong> Pacientes mais idosos requerem mais tempo de atendimento, 
            mas mantêm boa satisfação. Considere slots diferenciados por faixa etária.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function PagamentoChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Relatório por Forma de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {pagamentoData.map((forma, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{forma.forma}</span>
                {index === 0 ? <TrendingUp className="h-4 w-4 text-success" /> : 
                 index === 1 ? <TrendingDown className="h-4 w-4 text-destructive" /> : null}
              </div>
              <div className="text-2xl font-bold" style={{ color: forma.cor }}>
                {forma.valor}%
              </div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pagamentoData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={100}
              fill="#8884d8"
              dataKey="valor"
              label={({ forma, valor }) => `${forma}: ${valor}%`}
            >
              {pagamentoData.map((entry, index) => (
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