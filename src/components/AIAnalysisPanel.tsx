import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Brain, Loader2, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisResult {
  diagnosis: string
  confidence: number
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
}

export function AIAnalysisPanel() {
  const [symptoms, setSymptoms] = useState("")
  const [patientAge, setPatientAge] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const { toast } = useToast()

  const handleAnalysis = async () => {
    if (!symptoms.trim() || !patientAge) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha todos os campos antes de analisar.",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    
    // Simulação de análise de IA
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        diagnosis: "Suspeita de síndrome do olho seco com possível componente alérgico",
        confidence: 87,
        recommendations: [
          "Realizar exame de Schirmer para quantificar produção lacrimal",
          "Prescrever lágrimas artificiais sem conservantes",
          "Investigar possíveis alérgenos ambientais",
          "Retorno em 15 dias para reavaliação"
        ],
        riskLevel: "medium"
      }
      
      setResult(mockResult)
      setIsAnalyzing(false)
      
      toast({
        title: "Análise concluída",
        description: "A IA gerou um diagnóstico preliminar baseado nos sintomas.",
      })
    }, 3000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "text-destructive"
      case "medium": return "text-warning"
      case "low": return "text-success"
      default: return "text-muted-foreground"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high": return <AlertTriangle className="h-4 w-4" />
      case "medium": return <AlertTriangle className="h-4 w-4" />
      case "low": return <CheckCircle className="h-4 w-4" />
      default: return null
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Análise Inteligente de Sintomas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Idade do Paciente</Label>
            <Input
              id="age"
              type="number"
              placeholder="Ex: 45"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="upload">Anexar Exames</Label>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload de Imagens
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="symptoms">Descrição dos Sintomas</Label>
          <Textarea
            id="symptoms"
            placeholder="Descreva os sintomas do paciente em detalhes: dor, vermelhidão, lacrimejamento, visão turva, etc."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
          />
        </div>

        <Button 
          onClick={handleAnalysis} 
          disabled={isAnalyzing}
          className="w-full bg-gradient-primary"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analisando com IA...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4 mr-2" />
              Iniciar Análise
            </>
          )}
        </Button>

        {result && (
          <div className="mt-6 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Diagnóstico Preliminar</h4>
                <Badge variant="secondary">
                  Confiança: {result.confidence}%
                </Badge>
              </div>
              
              <p className="text-sm text-foreground">{result.diagnosis}</p>
              
              <div className="flex items-center gap-2">
                <span className={getRiskColor(result.riskLevel)}>
                  {getRiskIcon(result.riskLevel)}
                </span>
                <span className={`text-sm font-medium ${getRiskColor(result.riskLevel)}`}>
                  Nível de Risco: {result.riskLevel === "high" ? "Alto" : 
                                   result.riskLevel === "medium" ? "Médio" : "Baixo"}
                </span>
              </div>

              <div>
                <h5 className="font-medium mb-2">Recomendações:</h5>
                <ul className="space-y-1">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}