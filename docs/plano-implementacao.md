# Plano de Implementação — Página de Perfil

Resumo
- Objetivo: implementar a página de perfil do usuário conforme `public/docs/especificacao.md`: exibir dados pessoais (nome, e‑mail, Titã favorito), data de cadastro (DD/MM/AAAA) e a avaliação do anime (aspecto, tema, nota, conhecia). Implementar as camadas backend (routes/controllers/models) e integração frontend (HTML, CSS, JS). Reusar `dashboard.html`/`dashboards.css` como base visual.

1) Arquivos a criar ou alterar
- Criar: `docs/plano-implementacao.md` (este documento).
- Backend (criar):
  - `src/routes/perfil.js` — nova rota REST para retornar os dados do perfil (ex: `GET /perfil?userID=...`).
  - `src/controllers/perfilController.js` — lógica de controle: validar parâmetros, orquestrar consultas aos models, montar JSON e tratar erros.
  - `src/models/perfilModel.js` (ou estender `usuarioModel.js`/`avaliacaoModel.js`) — consultas SQL para recuperar dados da tabela `usuario` e da tabela `avaliacao` relacionados ao usuário.

- Frontend (criar):
  - `public/dashboardperfil.html` — nova página HTML, baseada em `public/dashboard/dashboard.html` (estrutura e estilos semelhantes; título deve ser "Meu perfil").
  - `public/js/perfil.js` — fetch para a rota do backend, preenchimento do DOM, tratamento de carregamento/erros e exibição de mensagem quando não houver avaliação.
  - Reaproveitar `public/css/dashboards.css` e `public/css/estilo.css`; criar `public/css/perfil.css` apenas se ajustes específicos forem necessários.

- Testes / verificação (arquivos de suporte) — opcional/ recomendado:
  - `tests/integration/perfil.test.js` — testes de integração com Supertest (se for adicionar infra de testes).

2) Componentes e responsabilidades
- Rota (src/routes/perfil.js): expor endpoint(s) públicos necessários (ex: `GET /perfil?userID=ID`). Encaminha para `perfilController`.
- Controller (src/controllers/perfilController.js): receber request, validar `userID`, chamar model(s), formatar resposta (JSON) e retornar códigos HTTP adequados (200, 400, 500). Em caso de ausência de avaliação, retornar objeto com avaliação = null ou campo específico `avaliacao: null`.
- Model (src/models/perfilModel.js): executar consultas SQL usando `src/database/config` existente. Deve retornar estrutura simples para o controller montar a resposta.
- Frontend (public/perfil.html + public/js/perfil.js): ler `sessionStorage.ID_USUARIO` (padrão já usado no projeto), fazer `fetch` para `/perfil?userID=...`, receber JSON, preencher elementos HTML. Exibir mensagens durante carregamento, se não houver avaliação e em caso de erro de comunicação.

3) Fluxo de execução (alto nível)
1. Usuário autenticado navega para `public/perfil.html` (front-end).  
2. `perfil.js` obtém `sessionStorage.ID_USUARIO`.  
3. `perfil.js` faz `fetch('/perfil?userID=${id}', { cache: 'no-store' })`.  
4. `src/routes/perfil.js` recebe requisição e chama `perfilController.getPerfil(req, res)`.  
5. `perfilController` valida `userID`, chama `perfilModel.getUsuarioPorId(userID)` e `perfilModel.getAvaliacaoPorUsuario(userID)` (pode ser uma única query com JOIN).  
6. Model executa SQL via `database.executar(instrucaoSql)` e retorna Promises.  
7. Controller monta JSON de resposta e envia `res.status(200).json({ usuario: {...}, avaliacao: {...} })` ou `avaliacao: null`.  
8. Frontend recebe JSON e atualiza o DOM (nome, email, titã favorito, dt_cadastro formatada em DD/MM/AAAA, campos da avaliação). Em caso de `avaliacao === null` exibir mensagem informativa.

4) Regras de negócio (extraídas da especificação)
- Exibir apenas dados do usuário autenticado.  
- Não permitir que um usuário consulte os dados de outro alterando parâmetros da requisição (nota sobre limitação: atualmente o app usa sessionStorage e não há token; ver decisões técnicas abaixo).  
- Data de cadastro deve vir do campo `dt_cadastro` da tabela `usuario` e ser mostrada em DD/MM/AAAA.  
- Titã favorito vem do campo `tipo_tita` da tabela `usuario`.  
- Avaliação deve ser localizada por chave estrangeira que relaciona `avaliacao.usuario_id` com `usuario.id`. Se não existir avaliação, mostrar mensagem adequada, mas não impedir exibição dos demais dados.  
- Em caso de erro de comunicação com API, mostrar mensagem de erro no frontend.

5) Decisões técnicas e justificativas
- Endpoint: `GET /perfil?userID={id}` para manter padrão já presente em outras rotas (`/avaliacao/grafico/tentativasUser?userID=...`). Simplicidade e consistência com código existente.
- Resposta JSON (proposta):
  ```json
  {
    "usuario": { "id": 1, "username": "Ana", "email": "a@b.com", "tipo_tita": "Ataque", "dt_cadastro": "2023-08-01T..." },
    "avaliacao": { "aspecto": "Narrativa", "tema": "Liberdade", "nota": 9, "conhecia": "sim" } // ou null
  }
  ```
- SQL: preferir uma única query com LEFT JOIN para garantir que a ausência de avaliação não impeça a recuperação do usuário. Exemplo:
  ```sql
  SELECT u.id, u.username, u.email, u.tipo_tita, u.dt_cadastro,
         a.aspecto AS aspecto, a.tema AS tema, a.nota AS nota, a.conhecia AS conhecia
  FROM usuario u
  LEFT JOIN avaliacao a ON a.fk_usuario = u.id
  WHERE u.id = ${userID};
  ```
  Observação: ajustar nomes de colunas conforme o schema real (ex.: fk_usuario, dt_cadastro, tipo_tita).
- Autenticação/Autorização: atualmente o projeto armazena sessão no `sessionStorage` (frontend) e não há token JWT visível no backend. Portanto:
  - Solução mínima (compatível com projeto atual): exigir `userID` na query e confiar que frontend só fornecerá o ID do usuário logado (documentar limitação de segurança).  
  - Recomenda-se como evolução: implementar middleware de autenticação (JWT ou sessions) e alterar rota para usar userId extraído do token em vez de aceitar `userID` por query. Isso deve constar como dívida técnica.
- Formatação de data: formatar para DD/MM/AAAA no frontend com uma função utilitária em `perfil.js` (ou formatar no backend antes de enviar). Preferência: formatar no frontend para manter API com timestamps padrão ISO.
- Reuso visual: reaproveitar `public/css/dashboards.css` e estrutura de `dashboard.html` para manter identidade visual; reduzir trabalho e manter consistência.
- Tratamento de erros: retornar status 400 para requisições com userID inválido/ausente; 500 para erros de DB; no frontend mostrar mensagens claras.

6) Etapas numeradas de implementação e como validar cada uma
1. Preparação (leitura do código existente)
   - O que fazer: revisar `src/models/usuarioModel.js`, `src/models/avaliacaoModel.js`, `public/js/sessao.js` e exemplos em `public/dashboard/*.html` para padronizar estilo e parâmetros.
   - Validação: checklist manual — confirmar que `sessionStorage.ID_USUARIO` é preenchido no login (ver `public/login.html`); confirmar que `database/config` funciona localmente.

2. Criar model/queries (`src/models/perfilModel.js`) que retornem usuário + avaliação
   - O que fazer: implementar função(s) `getPerfilPorId(userID)` que retorne Promise com os dados (usar LEFT JOIN). Reusar `database.executar`.
   - Validação: executar manualmente a query no servidor (ou via script) e verificar retorno esperado. Testes:
     - Inserir um usuário com avaliação no banco e executar a query: receber linha com campos de usuário + avaliação.
     - Inserir usuário sem avaliação: receber linha com campos de usuário e colunas de avaliação nulas.

3. Criar controller (`src/controllers/perfilController.js`) e rota (`src/routes/perfil.js`)
   - O que fazer: controller que valida `userID` (presente e number), chama model, monta resposta JSON e trata erros. Rota `GET /perfil` que chama controller.
   - Validação: iniciar servidor e testar com curl/Postman:
     - `GET http://localhost:PORT/perfil?userID=1` retorna 200 + JSON com `usuario` e `avaliacao` (ou `avaliacao: null`).
     - `GET /perfil` sem userID retorna 400 com mensagem de erro.
     - Testar cenário de erro de DB forçando credenciais erradas -> rota retorna 500.

4. Criar frontend (HTML + JS)
   - O que fazer: criar `public/dashboard/perfil.html` usando `dashboard.html` como template; criar `public/js/perfil.js` que: lê `sessionStorage.ID_USUARIO`, faz fetch, formata data, preenche DOM; exibe mensagens de loading/erro/sem avaliação.
   - Validação:
     - Abrir `http://localhost:PORT/perfil.html` em navegador estando logado (sessionStorage preenchido no login) e verificar: nome, e‑mail, titã favorito, data formatada e campos da avaliação aparecem corretamente.
     - Teste de ausência de avaliação: usuário sem avaliação -> mensagem informando "Nenhuma avaliação registrada" enquanto os dados pessoais aparecem.
     - Teste de erro de API: desligar servidor ou alterar URL -> página exibe mensagem "Não foi possível carregar os dados".

5. Testes de segurança / autorização (observação prática)
   - O que fazer: validar que não é possível obter dados de outro usuário apenas mudando `userID` na query. (Dado o estado atual do projeto, isso pode ser possível.)
   - Validação:
     - Tentar `GET /perfil?userID=X` com X sendo outro usuário — verificar se API retorna dados (se retornar, documentar limitação).  
     - Recomendação: para corrigir, implementar autenticação por token e extrair userID do token no backend.

6. Testes finais de aceitação (critério de aceitação da especificação)
   - O que testar: cobertura dos critérios listados em especificação (seções 7):
     - Página carrega informações do usuário autenticado.
     - Nome, e‑mail, tipo_tita correspondem ao banco.
     - Data de cadastro formatada DD/MM/AAAA.
     - Avaliação mostra aspecto, tema, nota e conhecia ou mensagem quando ausente.
     - Frontend consome dados via API (verificar network tab do navegador para garantir que o HTML não traga valores fixos).
   - Validação: checklist com passos manuais + screenshots / gravação curta (opcional). Para cada item, marcar OK/KO.

7) Observações, riscos e melhorias futuras
- Limitação de segurança: sem token/JWT o backend não tem como garantir que o `userID` enviado é do usuário autenticado. Recomenda‑se implementar autenticação baseada em tokens e middleware para extrair userID do token (reduzir risco de exposição de dados).  
- Performance: consultas simples, mas se houver muitos joins por usuário (histórico de avaliações), paginar ou limitar resultados.  
- Internacionalização/formatos: datas no frontend para manter API agnóstica; considerar utilitário comum para formatação.

8) Exemplo de contrato da API (documentação rápida)
- Endpoint: `GET /perfil?userID={id}`
- Sucesso (200):
  ```json
  {
    "usuario": { "id": 1, "username": "Ana", "email": "a@b.com", "tipo_tita": "Ataque", "dt_cadastro": "2023-08-01T12:34:56.000Z" },
    "avaliacao": { "aspecto": "Narrativa", "tema": "Liberdade", "nota": 9, "conhecia": "sim" }
  }
  ```
- Quando não há avaliação: `avaliacao: null`.
- Erros:
  - 400: parâmetro ausente/ inválido: `{ "erro": "userID ausente" }`.
  - 500: erro interno do servidor: retorno do erro SQL (ou mensagem genérica).

9) Cronograma (estimativa rápida)
- 0.5 dia: leitura/ajustes e criação do model com query correta.  
- 0.5 dia: controller + rota e testes via curl/Postman.  
- 0.5 dia: frontend HTML + JS e testes manuais no navegador.  
- 0.5 dia: ajustes de UI/cores e tratamento de erros.  
- 0.5 dia: testes de integração / documentação final / revisão de segurança.  

Conclusão
- O plano acima segue a identidade e padrões já presentes no projeto: uso de `database.executar`, rotas Express em `src/routes`, controllers em `src/controllers` e front-end estático em `public`. A principal dívida técnica a resolver posteriormente é a autenticação forte (tokens) para evitar exposição de dados ao permitir userID via query string.
