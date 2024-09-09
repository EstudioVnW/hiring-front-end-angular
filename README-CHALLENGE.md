
## Objetivo
Desenvolva uma tabela que carrega dados de um JSON. A tabela deve permitir a edição, adição e exclusão de linhas. Os dados modificados devem ser refletidos no JSON local.

## Como começar
Dar um fork no projeto, clonar o repositório em sua máquina local e criar um branch novo para o seu código.


## Regras de negócio
•	Novos registros devem conter todos os campos obrigatórios (name, email, phone, department, role, dateJoined).

•	O campo id deve ser gerado automaticamente ao adicionar um novo registro.

•	Qualquer campo de um registro existente pode ser editado, exceto o id.

•	Um registro pode ser excluído apenas se o usuário confirmar a ação (ex: através de um modal de confirmação).

•	A tabela deve permitir filtrar por department e role.

•	A ordenação pode ser feita por qualquer campo, em ordem crescente ou decrescente.

•	A tabela deve suportar paginação, exibindo no máximo 5 registros por página.

•	O usuário deve poder exportar os registros visíveis em um arquivo CSV.

•	O CSV deve incluir apenas os registros da página atual se a paginação estiver ativa.

•	O sistema deve permitir a busca de registros pelo name, email, ou phone.


## Referências
•	JSON de referência:

```
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1 555-555-5555",
      "department": "Sales",
      "role": "Sales Manager",
      "dateJoined": "2022-01-15"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "+1 555-123-4567",
      "department": "Engineering",
      "role": "Software Engineer",
      "dateJoined": "2023-03-22"
    },
    {
      "id": 3,
      "name": "Michael Brown",
      "email": "michael.brown@example.com",
      "phone": "+1 555-987-6543",
      "department": "Marketing",
      "role": "Marketing Coordinator",
      "dateJoined": "2021-07-30"
    },
    {
      "id": 4,
      "name": "Emily Davis",
      "email": "emily.davis@example.com",
      "phone": "+1 555-654-3210",
      "department": "Human Resources",
      "role": "HR Specialist",
      "dateJoined": "2020-11-05"
    },
    {
      "id": 5,
      "name": "William Johnson",
      "email": "william.johnson@example.com",
      "phone": "+1 555-321-4321",
      "department": "Finance",
      "role": "Financial Analyst",
      "dateJoined": "2019-02-19"
    },
    {
      "id": 6,
      "name": "Olivia Taylor",
      "email": "olivia.taylor@example.com",
      "phone": "+1 555-789-1234",
      "department": "Customer Support",
      "role": "Support Specialist",
      "dateJoined": "2021-05-18"
    },
    {
      "id": 7,
      "name": "James Wilson",
      "email": "james.wilson@example.com",
      "phone": "+1 555-456-7890",
      "department": "IT",
      "role": "System Administrator",
      "dateJoined": "2022-09-12"
    },
    {
      "id": 8,
      "name": "Sophia Martinez",
      "email": "sophia.martinez@example.com",
      "phone": "+1 555-654-9876",
      "department": "Legal",
      "role": "Legal Advisor",
      "dateJoined": "2020-02-24"
    },
    {
      "id": 9,
      "name": "David Lee",
      "email": "david.lee@example.com",
      "phone": "+1 555-321-8765",
      "department": "Operations",
      "role": "Operations Manager",
      "dateJoined": "2018-08-03"
    },
    {
      "id": 10,
      "name": "Ava White",
      "email": "ava.white@example.com",
      "phone": "+1 555-654-4321",
      "department": "Product",
      "role": "Product Manager",
      "dateJoined": "2023-01-10"
    }
  ]
}
```


## Observações
1. Utilizar Angular na versão 15.
2. Utilização de typescript.
3. Design de livre escolha.


## Requisitos Técnicos para a entrega do teste

•	Utilizar SASS

•	O projeto deve ter uma documentação em readme ensinando a: 
1. instalar o projeto na máquina (engines, versão de node, qual gerenciador de pacote usar)
2. instalar as dependências do projeto
3. rodar o ambiente de desenvolvimento
4. rodar a build de deploy da aplicação.

•	Hospedar o projeto em um servidor (Heroku, Vercel, Netlify)


Boa sorte!
