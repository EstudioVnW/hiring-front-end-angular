<p align="center">
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76541047/365524077-d98e20f2-997a-4079-9e2b-356f29cc9ff1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T053843Z&X-Amz-Expires=300&X-Amz-Signature=412cfcfa3f61cfd1374f702dbc2ec83a65cf9bae9e09554366ba0325bd9174bb&X-Amz-SignedHeaders=host&actor_id=76541047&key_id=0&repo_id=803458455" width="100" />
</p>

<h1 align="center">
  hiring-front-end-angular
</h1>

<p align="center">
 <a href="#figma">Figma</a> •
 <a href="#layout">Layout</a> • 
 <a href="#config">Configuração do Projeto</a> • 
 <a href="#deploy">Deploy</a> 
</p>

<p> 
  <strong> Este projeto consiste em uma tabela dinâmica que carrega dados de um arquivo JSON. A tabela permite:</strong> editar registros existentes, adicionar novos registros, Excluir registros, filtrar registros por `department` e `role`, ordenar registros por qualquer campo, paginar registros, com no máximo 5 registros por página, exportar registros visíveis em CSV, buscar registros por `name`, `email` ou `phone` e Validação de formulários.
  As alterações feitas na tabela são refletidas diretamente no JSON local, garantindo que os dados estejam sempre atualizados.
</p>
  
<h2 id="figma">🎨Design</h2> 

O design da aplicação está disponível no Figma. Você pode visualizar e obter os detalhes do design através do seguinte link:

[Figma Design - Hiring Front-end Angular](https://www.figma.com/design/JCwvqIXLh0Kc8TtHW86zCW/hiring-front-end-angular?node-id=1-475&node-type=FRAME&t=V3Xz037K3yza65wf-0)

<h2 id="layout">🖼️Imagens do Layout</h2>

Abaixo estão algumas imagens representativas do layout da aplicação, conforme o design definido no Figma. 

<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76541047/365513455-b73d50e3-c8bb-42d4-9a9e-5ffe79af5ece.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T043748Z&X-Amz-Expires=300&X-Amz-Signature=b41c91b9b8fc377a66e12d83f84f5e9df3320dbad756f0ce8c6a33265db73b1e&X-Amz-SignedHeaders=host&actor_id=76541047&key_id=0&repo_id=803458455" width="370"/>
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76541047/365513795-ca68d786-c5cb-491e-816a-18aae799f2bd.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T043940Z&X-Amz-Expires=300&X-Amz-Signature=42037304f47a50a240680666d1989bfb82a02f0a56698db29bb7fc5dca90bee9&X-Amz-SignedHeaders=host&actor_id=76541047&key_id=0&repo_id=803458455" width="370"/>
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76541047/365514123-40d61567-f960-4de4-bfd8-8f70be67d81b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T044213Z&X-Amz-Expires=300&X-Amz-Signature=8cfd3574b540ec7e349982a0da818fe0bba64152913e5a28344fde8292b970e0&X-Amz-SignedHeaders=host&actor_id=76541047&key_id=0&repo_id=803458455" width="370"/>
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/76541047/365534428-0e97e2a8-f844-460c-8f26-c56d561b426c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240909T062539Z&X-Amz-Expires=300&X-Amz-Signature=0aeb4c3012ed81c26a993ff23e08a0ffa7598f6687898e8e7687fc25a5f1e1a6&X-Amz-SignedHeaders=host&actor_id=76541047&key_id=0&repo_id=852424512" width="370"/>

</p>

<h2 id="config">🛠️Configuração do Projeto </h2>

### 1. Instalar o Projeto na Máquina

- Versão de Node.js: O projeto foi desenvolvido com Node.js versão 20.10.0. É recomendável instalar essa versão para garantir compatibilidade.

- Gerenciador de Pacotes: Utilize o npm (Node Package Manager) para gerenciar as dependências do projeto.

- Para instalar o Node.js e o npm, você pode baixar o instalador apropriado para o seu sistema operacional no site oficial do Node.js.

- Versão do Angular:
Este projeto utiliza Angular versão 15. Certifique-se de ter o Angular CLI instalado com a versão compatível:

```bash
    npm install -g @angular/cli@15
```
Agora é só clone o projeto na sua máquina, usando o comando:

```bash
    git clone https://github.com/jussaraalves/hiring-front-end-angular.git
```

### 2. Entre no diretório do projeto
Depois de clonar o repositório, navegue até o diretório do projeto e execute o seguinte comando para instalar as dependências necessárias:

```bash
   npm install
```

### 3. Rodar o Ambiente de Desenvolvimento
Para iniciar o servidor de desenvolvimento e ver a aplicação em funcionamento, utilize:

```bash
  npm start
```
O projeto será iniciado e estará acessível em http://localhost:4200 por padrão.

### 4. Rodar a Build de Deploy da Aplicação
Para criar uma build de produção do projeto, execute o comando:

```bash
  npm run build
```
<h2 id="deploy">🌐Hospedagem</h2>

O projeto está hospedado no seguinte link:

[Link da Hospedagem](https://example.com) 
