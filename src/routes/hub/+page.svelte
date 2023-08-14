<script>
	import { linear } from 'svelte/easing';

    export let data;
    //console.log(data.data);
</script>

<body>

<div>
  <form method="post" action="/hub?/addLab">

    <label for="lab_nome">Nome do Laboratório</label>
    <input type="text" name="lab_nome" title="Nome do Laboratório" required/><br>

    <label for="maq_qt">Quantidade de Máquinas</label>
    <input type="number" name="maq_qt" title="Quantidade de Máquinas" required/><br>

    <button>Enviar</button><br>

  </form>
</div>

<div>
  <form method="post" action="/hub?/send_err">

    <label for="lab_id">Laboratório</label>
    <select name="lab_id" title="laboratório">
      {#each data.labData as labs}
        <option value="{labs.lab_name}">{labs.lab_name}</option>
      {/each}
    </select>

    <label for="maq_id">Máquina</label>
    <input type="number" name="maq_id" title="Máquina" required/><br>

    <label for="error">Descrição do Erro</label>
    <input type="text" name="error" title="Descrição" required size="100"/><br>

    <button>Enviar</button><br>

  </form>
</div>
<br>

<section class="show-error">
  
  <table>
    <tr>
      <th>ID do Erro</th>
      <th>Laboratório</th>
      <th>Máquina</th>
      <th>Descrição</th>
    </tr>
    
    {#each data.data as error}
    
      <tr>
        <td>{error.error_id}</td>
        <td>{error.lab}</td>
        <td>{error.error_maq}</td>
        <td>{error.description}</td>
        
      </tr>
    
    {/each}
  </table>

  <div class="delete">
    <p>Selecione qual entrada deseja deletar permanentemente.</p>
    <form method="POST" action="/hub?/deleteEntry">
      <select name="id">
        {#each data.data as err}
          <option value="{err.error_id}">{err.error_id}</option>
        {/each}
      </select>
      <button>Deletar</button>
    </form>
  </div>

</section>

<section class="show-labs">
  
  <table>
    <tr>
      <th>ID do Laboratório</th>
      <th>Nome do Laboratório</th>
      <th>Quantidade de Máquinas</th>
    </tr>
    {#each data.labData as labs}
      <tr>
        <td>{labs.lab_id}</td>
        <td>{labs.lab_name}</td>
        <td>{labs.maqs}</td>
      </tr>
    {/each}
  </table>

  <div class="delete">
    <p>Selecione qual entrada deseja deletar permanentemente.</p>
    <form method="POST" action="/hub?/deleteLab">
      <select name="id">
        {#each data.labData as err}
          <option value="{err.lab_name}">{err.lab_name}</option>
        {/each}
      </select>
      <button>Deletar</button>
    </form>
  </div>

</section>

</body>

<!--

  Todos tem acesso a ver quais erros existem nos laboratórios, e todos podem adicionar novos
  Mas somente administradores e bolsistas tem direito de editar e marcar como resolvidos.
  Logo, arrumar um jeito de mostrar as opções de editar e "resolver" somente para esses dois tipos de usuário.


    
  -->
  <style>

    body {
      background-color: gray;
      
    }

    .show-error {
      margin: auto;
      width: 50%;
      border: 3px solid black;
      padding: 10px;
    }

    .show-labs{
      margin: auto;
      width: 50%;
      border: 3px solid black;
      padding: 10px;
    }

    table, th, td {
      margin: auto;
    }

    th, td {
      border: 3px;
      border-style: solid;
      border-collapse: collapse;
      border-spacing: 5px;
      padding: 2px 2px 3px 3px;
    }

    td:hover {background-color: #D6EEEE;}

  </style>