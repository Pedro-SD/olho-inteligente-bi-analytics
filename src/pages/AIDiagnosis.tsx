import { Brain, Upload, Eye, CheckCircle, AlertTriangle, FileText, Zap } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const aiAnalysisData = [
  {
    id: "IA001",
    patient: "Maria Silva Santos",
    examType: "Retinografia",
    date: "2024-01-20",
    aiResult: "Retinopatia Diabética",
    confidence: 94.2,
    severity: "Moderada",
    status: "Validado",
    doctor: "Dr. Carlos Mendoza",
    recommendations: ["Controle glicêmico rigoroso", "Retorno em 3 meses", "Avaliação endócrina"]
  },
  {
    id: "IA002", 
    patient: "João Carlos Oliveira",
    examType: "Campo Visual",
    date: "2024-01-19",
    aiResult: "Glaucoma Primário",
    confidence: 89.7,
    severity: "Avançado",
    status: "Pendente",
    doctor: "Dra. Ana Beatriz", 
    recommendations: ["Cirurgia imediata", "Redução pressão ocular", "Acompanhamento semanal"]
  },
  {
    id: "IA003",
    patient: "Ana Paula Costa",
    examType: "OCT",
    date: "2024-01-18", 
    aiResult: "Degeneração Macular",
    confidence: 87.3,
    severity: "Inicial",
    status: "Em análise",
    doctor: "Dr. Roberto Silva",
    recommendations: ["Suplementação vitamínica", "Proteção UV", "Retorno em 6 meses"]
  }
]

const modelPerformance = [
  { condition: "Retinopatia Diabética", accuracy: 94.2, cases: 1247 },
  { condition: "Glaucoma", accuracy: 91.8, cases: 892 },
  { condition: "Degeneração Macular", accuracy: 89.5, cases: 673 },
  { condition: "Catarata", accuracy: 96.1, cases: 1456 },
  { condition: "Descolamento Retina", accuracy: 87.3, cases: 234 },
]

const AIDiagnosis = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">IA Diagnóstico</h1>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
              <Upload className="h-4 w-4 mr-2" />
              Analisar Imagem
            </Button>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="analysis" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="analysis">Análises</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="training">Treinamento</TabsTrigger>
                <TabsTrigger value="validation">Validação</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="space-y-6">
                {/* AI Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Análises Hoje</CardTitle>
                      <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23</div>
                      <p className="text-xs text-muted-foreground">+8% que ontem</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Precisão Média</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">92.4%</div>
                      <p className="text-xs text-muted-foreground">Todos os modelos</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Casos Críticos</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-xs text-muted-foreground">Requer atenção</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                      <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.3s</div>
                      <p className="text-xs text-muted-foreground">Por análise</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent AI Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análises Recentes</CardTitle>
                    <CardDescription>Diagnósticos gerados pela IA aguardando validação médica</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Paciente</TableHead>
                          <TableHead>Exame</TableHead>
                          <TableHead>Diagnóstico IA</TableHead>
                          <TableHead>Confiança</TableHead>
                          <TableHead>Severidade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {aiAnalysisData.map((analysis) => (
                          <TableRow key={analysis.id}>
                            <TableCell className="font-medium">{analysis.patient}</TableCell>
                            <TableCell>{analysis.examType}</TableCell>
                            <TableCell>{analysis.aiResult}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={analysis.confidence} className="w-16" />
                                <span className="text-sm font-medium">{analysis.confidence}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  analysis.severity === "Inicial" ? "outline" :
                                  analysis.severity === "Moderada" ? "secondary" :
                                  "destructive"
                                }
                              >
                                {analysis.severity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  analysis.status === "Validado" ? "default" :
                                  analysis.status === "Em análise" ? "secondary" :
                                  "outline"
                                }
                              >
                                {analysis.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Ver
                                </Button>
                                <Button variant="outline" size="sm">Validar</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recommendations Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recomendações da IA</CardTitle>
                    <CardDescription>Sugestões de tratamento baseadas nos diagnósticos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiAnalysisData.slice(0, 2).map((analysis) => (
                        <div key={analysis.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{analysis.patient}</h4>
                              <p className="text-sm text-muted-foreground">{analysis.aiResult} - {analysis.severity}</p>
                            </div>
                            <Badge variant="outline">{analysis.confidence}% confiança</Badge>
                          </div>
                          <div className="space-y-1">
                            {analysis.recommendations.map((rec, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {rec}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance dos Modelos</CardTitle>
                    <CardDescription>Precisão e casos analisados por condição</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {modelPerformance.map((model) => (
                        <div key={model.condition} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{model.condition}</div>
                            <div className="text-sm text-muted-foreground">{model.cases} casos analisados</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Progress value={model.accuracy} className="w-24" />
                            <span className="font-medium text-sm w-12">{model.accuracy}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="training" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Treinamento de Modelos</CardTitle>
                    <CardDescription>Status do treinamento e melhorias contínuas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <Brain className="h-12 w-12 mx-auto mb-4" />
                      <p>Módulo de treinamento em desenvolvimento</p>
                      <p className="text-sm">Em breve: interface para retreinamento de modelos</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="validation" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Validação Médica</CardTitle>
                    <CardDescription>Aprovação e correção dos diagnósticos da IA</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-12">
                      <FileText className="h-12 w-12 mx-auto mb-4" />
                      <p>Sistema de validação em desenvolvimento</p>
                      <p className="text-sm">Em breve: workflow de aprovação médica</p>
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

export default AIDiagnosis;