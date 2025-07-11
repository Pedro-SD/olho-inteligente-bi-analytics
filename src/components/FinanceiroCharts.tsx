import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

// Dados para Contas a Receber
const contasReceberData = [
  { status: 'Em Dia', valor: 125000, count: 45, cor: '#10B981' },
  { status: '1-30 dias', valor: 78000, count: 28, cor: '#F59E0B' },
  { status: '31-60 dias', valor: 45000, count: 15, cor: '#EF4444' },
  { status: '60+ dias', valor: 23000, count: 8, cor: '#DC2626' },
]

// Dados para Fluxo Diário
const fluxoDiarioData = [
  { dia: '01', entrada: 12500, saida: 8900, saldo: 3600 },
  { dia: '02', entrada: 15200, saida: 11200, saldo: 4000 },
  { dia: '03', entrada: 9800, saida: 7500, saldo: 2300 },
  { dia: '04', entrada: 18500, saida: 13200, saldo: 5300 },
  { dia: '05', entrada: 16800, saida: 12100, saldo: 4700 },
  { dia: '06', entrada: 8900, saida: 6200, saldo: 2700 },
  { dia: '07', entrada: 7200, saida: 5800, saldo: 1400 },
]

// Dados mensais de evolução
const evolucaoMensalData = [
  { mes: 'Jan', faturamento: 285000, recebido: 270000, inadimplencia: 5.3 },
  { mes: 'Fev', faturamento: 312000, recebido: 298000, inadimplencia: 4.5 },
  { mes: 'Mar', faturamento: 298000, recebido: 285000, inadimplencia: 4.4 },
  { mes: 'Abr', faturamento: 325000, recebido: 312000, inadimplencia: 4.0 },
  { mes: 'Mai', faturamento: 341000, recebido: 328000, inadimplencia: 3.8 },
  { mes: 'Jun', faturamento: 356000, recebido: 344000, inadimplencia: 3.4 },
]

export function ContasReceberDashboard() {
  const totalReceber = contasReceberData.reduce((acc, item) => acc + item.valor, 0)
  const vencidas = contasReceberData.filter(item => item.status.includes('dias')).reduce((acc, item) => acc + item.valor, 0)
  
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Contas a Receber
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="text-sm text-muted-foreground">Total a Receber</div>
            <div className="text-2xl font-bold text-primary">
              R$ {totalReceber.toLocaleString()}
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-gradient-to-r from-red-50 to-red-100">
            <div className="text-sm text-muted-foreground">Valores Vencidos</div>
            <div className="text-2xl font-bold text-destructive">
              R$ {vencidas.toLocaleString()}
            </div>
            <div className="text-xs text-destructive mt-1">
              {((vencidas / totalReceber) * 100).toFixed(1)}% do total
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-green-100">
            <div className="text-sm text-muted-foreground">Taxa de Recuperação</div>
            <div className="text-2xl font-bold text-success">87.2%</div>
            <div className="text-xs text-success mt-1">+2.1% vs mês anterior</div>
          </div>
        </div>

        <div className="space-y-3">
          {contasReceberData.map((conta, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: conta.cor }}
                />
                <div>
                  <span className="font-medium">{conta.status}</span>
                  <div className="text-sm text-muted-foreground">{conta.count} contas</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">R$ {conta.valor.toLocaleString()}</div>
                <Badge variant={conta.status === 'Em Dia' ? 'default' : 'destructive'}>
                  {conta.status === 'Em Dia' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                   <AlertTriangle className="h-3 w-3 mr-1" />}
                  {conta.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function FluxoDiarioChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Controle de Fluxo Diário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={fluxoDiarioData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value) => [`R$ ${value.toLocaleString()}`, '']}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="entrada" 
              stackId="1" 
              stroke="hsl(var(--success))" 
              fill="hsl(var(--success))"
              fillOpacity={0.6}
              name="Entradas"
            />
            <Area 
              type="monotone" 
              dataKey="saida" 
              stackId="2" 
              stroke="hsl(var(--destructive))" 
              fill="hsl(var(--destructive))"
              fillOpacity={0.6}
              name="Saídas"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-7 gap-1">
          {fluxoDiarioData.map((dia, index) => (
            <div key={index} className="text-center p-2 border rounded">
              <div className="text-xs font-medium">Dia {dia.dia}</div>
              <div className={`text-sm font-bold ${dia.saldo > 0 ? 'text-success' : 'text-destructive'}`}>
                R$ {dia.saldo.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function EvolucaoFinanceiraChart() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Evolução Financeira Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolucaoMensalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis yAxisId="left" tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'inadimplencia' ? `${value}%` : `R$ ${value.toLocaleString()}`,
                name === 'faturamento' ? 'Faturamento' : 
                name === 'recebido' ? 'Recebido' : 'Inadimplência'
              ]}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="faturamento" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Faturamento"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="recebido" 
              stroke="hsl(var(--success))" 
              strokeWidth={3}
              name="Recebido"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="inadimplencia" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Inadimplência (%)"
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-xs text-muted-foreground">Crescimento Mensal</div>
            <div className="text-lg font-bold text-primary">+8.2%</div>
          </div>
          <div className="text-center p-3 bg-success/5 rounded-lg">
            <div className="text-xs text-muted-foreground">Taxa de Recebimento</div>
            <div className="text-lg font-bold text-success">96.6%</div>
          </div>
          <div className="text-center p-3 bg-destructive/5 rounded-lg">
            <div className="text-xs text-muted-foreground">Inadimplência</div>
            <div className="text-lg font-bold text-destructive">3.4%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FinanceiroActions() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Ações Financeiras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button className="w-full justify-between" variant="outline">
            <span>Gerar Relatório de Cobrança</span>
            <Badge variant="secondary">15 pendentes</Badge>
          </Button>
          <Button className="w-full justify-between" variant="outline">
            <span>Exportar Fluxo de Caixa</span>
            <Calendar className="h-4 w-4" />
          </Button>
          <Button className="w-full justify-between" variant="outline">
            <span>Configurar Alertas</span>
            <AlertTriangle className="h-4 w-4" />
          </Button>
          <Button className="w-full bg-gradient-primary">
            Processar Cobranças Automáticas
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Próximas Ações Recomendadas:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Contatar 8 clientes com pagamento em atraso</li>
            <li>• Revisar contratos vencendo em 30 dias</li>
            <li>• Atualizar preços conforme inflação médica</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}