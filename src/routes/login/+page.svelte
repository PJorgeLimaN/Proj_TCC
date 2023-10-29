<script lang="ts">
    export let form;

    /* 
    Possível tela nova OU nova parte dessa página exclusiva para administrador para adicionar novos usuários,
    Decidir se a tela registro vira uma tela própria ou se aparece em uma parte dessa página.
    */
</script>

<body>

    <section class="container">

        {#if form?.message}
        alert(message)
        {/if}

        <h2>Bem-Vindo ao Sistema de Manutenção de Máquinas dos Laboratórios do CIET</h2>
        <section class="container">
            {#if form?.message}
              <h2 class="error">{form?.message}</h2>  
            {/if}
          
            <form method="POST" action="?/logIn">
          
              <div>
                  <label for="username">Usuário</label> <br>
                  <input type="text" name="username" id="user" required>
              </div>
          
              <div>
                  <label for="password">Senha</label> <br>
                  <input type="password" name="password" id="pword" required>
              </div>
          
              <div>
                  <button>Enviar</button>
              </div>
          
          </form>
          
          <!-- <form action="/login?/access" method="POST">
              <button>Entrar Como Aluno</button>
          </form> -->
          
          </section>
    </section>

</body>
