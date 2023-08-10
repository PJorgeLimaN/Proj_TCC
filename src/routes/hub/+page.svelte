<script>
	import { linear } from 'svelte/easing';

    export let data;
    //console.log(data.data);
</script>

<body>

<form method="post" action="/hub">

    <label for="lab_id">Laboratório</label>
    <input type="text" name="lab_id" title="Laboratório"/><br>

    <label for="maq_id">Máquina</label>
    <input type="number" name="maq_id" title="Máquina"/><br>

    <label for="error">Descrição do Erro</label>
    <input type="text" name="error" title="Descrição"/><br>

    <button>Enviar</button><br>

</form>
<br>

<section class="show">
  
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

    .show {
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