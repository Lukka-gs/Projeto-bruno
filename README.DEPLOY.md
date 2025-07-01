Acesse vercel.com E CRIE UMA CONTA

Clique em "Add New Project" ou "Import Project"

Conecte sua conta GitHub e selecione o repositório.

Vercel detecta automaticamente se é React. Confirme:

Framework: React

Build Command: npm run build ou yarn build

Output Directory: build

Clique em Deploy.



backend:
crie uma conta no Fly.io

Fly CLI instalado:

no bash:
curl -L https://fly.io/install.sh | sh


Escolha um nome

Escolha a região próxima (GRU)

 Fly criará um fly.toml no projeto., configure a porta para 3000
Ajuste seu main.ts para rodar na porta do Fly: await app.listen(process.env.PORT || 3000);

no bash: fly deploy

Pronto. só acessar a url https://ecommerce-backend-nestjs.fly.dev
