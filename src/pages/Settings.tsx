import { Settings as SettingsIcon, User, Bell, Shield, Database, Palette, Globe } from "lucide-react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const Settings = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-20 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-black hover:bg-black/10" />
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold text-black">Configurações</h1>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
                <TabsTrigger value="system">Sistema</TabsTrigger>
                <TabsTrigger value="appearance">Aparência</TabsTrigger>
                <TabsTrigger value="integrations">Integrações</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Informações do Perfil
                    </CardTitle>
                    <CardDescription>Gerencie suas informações pessoais e profissionais</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue="Dr. Carlos Mendoza" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="carlos.mendoza@eyecare.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue="(11) 99999-1234" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="crm">CRM</Label>
                        <Input id="crm" defaultValue="CRM/SP 123456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Especialidade</Label>
                        <Select defaultValue="ophthalmology">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ophthalmology">Oftalmologia</SelectItem>
                            <SelectItem value="retina">Retina</SelectItem>
                            <SelectItem value="glaucoma">Glaucoma</SelectItem>
                            <SelectItem value="pediatric">Oftalmologia Pediátrica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Select defaultValue="general">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">Oftalmologia Geral</SelectItem>
                            <SelectItem value="surgery">Cirurgia</SelectItem>
                            <SelectItem value="emergency">Emergência</SelectItem>
                            <SelectItem value="admin">Administração</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-end">
                      <Button>Salvar Alterações</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Preferências de Notificação
                    </CardTitle>
                    <CardDescription>Configure como e quando receber notificações</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Novos Pacientes</Label>
                          <p className="text-sm text-muted-foreground">Receber notificações sobre novos pacientes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Exames Pendentes</Label>
                          <p className="text-sm text-muted-foreground">Alertas sobre exames aguardando resultado</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Consultas Agendadas</Label>
                          <p className="text-sm text-muted-foreground">Lembretes de consultas do dia</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Relatórios IA</Label>
                          <p className="text-sm text-muted-foreground">Notificações sobre diagnósticos da IA</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Alertas de Sistema</Label>
                          <p className="text-sm text-muted-foreground">Manutenções e atualizações do sistema</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Métodos de Notificação</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Email</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>SMS</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Push (Navegador)</Label>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Segurança da Conta
                    </CardTitle>
                    <CardDescription>Gerencie senhas e configurações de segurança</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Alterar Senha</Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Ativar 2FA</Label>
                          <p className="text-sm text-muted-foreground">Aumenta a segurança da sua conta</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Login com Biometria</Label>
                          <p className="text-sm text-muted-foreground">Usar impressão digital ou Face ID</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Sessões Ativas</Label>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Chrome - Windows</p>
                            <p className="text-sm text-muted-foreground">São Paulo, Brasil • Atual</p>
                          </div>
                          <Button variant="outline" size="sm" disabled>Atual</Button>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <p className="font-medium">Safari - iPhone</p>
                            <p className="text-sm text-muted-foreground">São Paulo, Brasil • 2 horas atrás</p>
                          </div>
                          <Button variant="outline" size="sm">Encerrar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Configurações do Sistema
                    </CardTitle>
                    <CardDescription>Configurações gerais e preferências do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Backup Automático</Label>
                          <p className="text-sm text-muted-foreground">Backup diário dos dados</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Logs de Auditoria</Label>
                          <p className="text-sm text-muted-foreground">Registrar todas as ações do sistema</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Modo de Manutenção</Label>
                          <p className="text-sm text-muted-foreground">Ativar durante atualizações</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Configurações de Performance</Label>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Cache do Sistema</Label>
                          <div className="flex gap-2">
                            <Button variant="outline">Limpar Cache</Button>
                            <Button variant="outline">Otimizar Banco</Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Tempo de Sessão (minutos)</Label>
                          <Select defaultValue="60">
                            <SelectTrigger className="w-48">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 minutos</SelectItem>
                              <SelectItem value="60">60 minutos</SelectItem>
                              <SelectItem value="120">2 horas</SelectItem>
                              <SelectItem value="480">8 horas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Aparência e Interface
                    </CardTitle>
                    <CardDescription>Personalize a aparência do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Tema</Label>
                        <Select defaultValue="light">
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Claro</SelectItem>
                            <SelectItem value="dark">Escuro</SelectItem>
                            <SelectItem value="auto">Automático</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Tamanho da Fonte</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequena</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Idioma</Label>
                        <Select defaultValue="pt-br">
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Preferências de Layout</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label>Sidebar Compacta</Label>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Animações</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Modo Alto Contraste</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Integrações
                    </CardTitle>
                    <CardDescription>Conecte com sistemas externos e APIs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center text-muted-foreground py-12">
                      <Globe className="h-12 w-12 mx-auto mb-4" />
                      <p>Módulo de integrações em desenvolvimento</p>
                      <p className="text-sm">Em breve: conectores para HIS, PACS e outros sistemas</p>
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

export default Settings;