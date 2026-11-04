# Guia de Commits 

## 1. Objetivo

Este guia define um padrão simples para escrever as mensagens de
**commit** do nosso projeto.

A ideia é que, ao olhar o histórico do Git, qualquer integrante do time
consiga entender rapidamente:

-   o que foi alterado;
-   em qual parte do projeto;
-   qual foi o objetivo da alteração.

Evite mensagens genéricas como `alterações`, `arrumei`, `fiz a tela` ou
`commit final`.

------------------------------------------------------------------------

## 2. Estrutura da mensagem

Vamos utilizar:

``` text
tipo(escopo): descrição
```

Exemplo:

``` text
feat(login): adiciona página de login
```

  Parte         Significado               Exemplo
  ------------- ------------------------- ----------------------------
  `tipo`        Categoria da alteração    `feat`
  `escopo`      Área do projeto afetada   `login`
  `descrição`   O que foi feito           `adiciona página de login`

Pense na mensagem como uma resposta para:

> **O que eu fiz e em qual parte do projeto?**

------------------------------------------------------------------------

## 3. Tipos de commit

### `feat` --- Nova funcionalidade

Use quando adicionar uma **nova funcionalidade**.

``` text
feat(login): adiciona página de login
feat(cadastro): adiciona formulário de usuário
feat(dashboard): adiciona gráfico de temperatura
```

------------------------------------------------------------------------

### `fix` --- Correção de erro

Use quando corrigir um **bug ou comportamento incorreto**.

``` text
fix(login): corrige validação de senha
fix(autenticacao): corrige nome da variável de usuário
fix(dashboard): corrige exibição da temperatura
```

------------------------------------------------------------------------

### `docs` --- Documentação

Use quando a alteração for **somente na documentação**.

``` text
docs(readme): adiciona instruções de instalação
docs(commits): adiciona guia de commits
docs(pi): atualiza documentação do projeto
```

------------------------------------------------------------------------

### `style` --- Estilo e formatação

Use para alterações de **estilo visual ou formatação** que não mudam a
lógica da aplicação.

``` text
style(login): altera cores da página
style(dashboard): ajusta espaçamento dos cards
style(cadastro): melhora alinhamento do formulário
```

Exemplos: cores, fontes, espaçamentos, bordas e alinhamento.

**Atenção:** se a alteração visual adicionar uma nova funcionalidade,
avalie se `feat` é mais adequado.

``` text
feat(dashboard): adiciona filtro por período
```

------------------------------------------------------------------------

### `perf` --- Melhoria de performance

Use quando houver uma **melhoria real de desempenho**.

``` text
perf(query): otimiza consulta de temperaturas
perf(dashboard): reduz tempo de carregamento
```

Não use `perf` apenas porque o código ficou mais organizado.

------------------------------------------------------------------------

### `refactor` --- Refatoração

Use quando modificar a estrutura do código **sem adicionar
funcionalidade e sem corrigir um bug**.

``` text
refactor(login): reorganiza validação do formulário
refactor(usuario): separa funções de validação
refactor(database): reorganiza conexão com o banco
```

O comportamento da aplicação continua essencialmente o mesmo.

------------------------------------------------------------------------

### `test` --- Testes

Use quando adicionar ou alterar **testes**.

``` text
test(login): adiciona testes de validação
test(usuario): adiciona testes para cadastro
```

------------------------------------------------------------------------

### `chore` --- Manutenção

Use para tarefas de manutenção que não se encaixam nas categorias
anteriores.

``` text
chore(git): atualiza gitignore
chore(dependencias): atualiza dependências
chore(config): ajusta configuração do projeto
```

------------------------------------------------------------------------

## 4. Como escrever uma boa descrição

A descrição deve ser **curta, objetiva e específica**.

### Evite

``` text
feat(login): fiz o login
fix(cadastro): arrumei um erro
docs(readme): mudanças
style(tela): deixei mais bonito
```

### Prefira

``` text
feat(login): adiciona validação de e-mail
fix(cadastro): corrige validação de senha
docs(readme): adiciona instruções de execução
style(login): ajusta espaçamento dos campos
```

------------------------------------------------------------------------

## 5. O escopo

O **escopo** identifica a parte do projeto que foi modificada.

Exemplos:

``` text
login
cadastro
dashboard
usuario
valores
database
api
backend
frontend
```

Exemplo:

``` text
feat(cadastro): adiciona formulário de usuário
fix(database): corrige consulta de sensores
style(dashboard): ajusta layout dos indicadores
```

O escopo não precisa ser exatamente um desses exemplos. O importante é
que seja **claro para o time**.

------------------------------------------------------------------------

## 6. Regra prática para escolher o tipo

Pergunte:

**Adicionei algo novo?**

``` text
feat
```

**Corrigi algo que estava errado?**

``` text
fix
```

**Alterei somente a documentação?**

``` text
docs
```

**Alterei somente o visual ou a formatação?**

``` text
style
```

**Melhorei o desempenho?**

``` text
perf
```

**Reorganizei o código sem mudar seu comportamento?**

``` text
refactor
```

**Adicionei ou alterei testes?**

``` text
test
```

**É uma tarefa de manutenção ou configuração?**

``` text
chore
```

------------------------------------------------------------------------

## 7. Um commit deve representar uma mudança coerente

Evite colocar várias alterações completamente diferentes no mesmo
commit.

### Evite

``` text
feat(projeto): adiciona login, corrige banco, muda dashboard e atualiza README
```

### Prefira

``` text
feat(login): adiciona autenticação de usuário
fix(database): corrige relacionamento entre tabelas
style(dashboard): ajusta layout dos indicadores
docs(readme): atualiza instruções do projeto
```

Um histórico com commits menores e coerentes facilita a leitura, revisão
e identificação de problemas.

------------------------------------------------------------------------

## 8. Antes de fazer o commit

Verifique o que foi alterado:

``` bash
git status
```

Confira as diferenças:

``` bash
git diff
```

Adicione os arquivos:

``` bash
git add .
```

Faça o commit:

``` bash
git commit -m "feat(login): adiciona página de login"
```

Envie para o repositório remoto:

``` bash
git push
```

------------------------------------------------------------------------

## 9. Exemplos para o nosso projeto

### Front-end

``` text
feat(login): adiciona tela de login
feat(cadastro): adiciona formulário de cadastro
style(login): ajusta cores e espaçamento
fix(dashboard): corrige exibição do status do sensor
```

### Banco de dados

``` text
feat(database): cria tabela de sensores
fix(database): corrige chave estrangeira de leitura
perf(query): otimiza consulta de leituras
```

### IoT

``` text
feat(sensor): adiciona leitura de temperatura
fix(sensor): corrige conversão da temperatura
feat(gateway): adiciona armazenamento temporário das leituras
```

### Documentação

``` text
docs(pi): atualiza escopo do projeto
docs(readme): adiciona instruções para execução
```
