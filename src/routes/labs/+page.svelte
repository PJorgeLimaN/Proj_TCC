<script>
	import { linear } from 'svelte/easing';

    export let data;
    //console.log(data.data);
</script>

<div>
    <form method="post" action="/hub?/addLab">
  
      <label for="lab_nome">Nome do Laboratório</label>
      <input type="text" name="lab_nome" title="Nome do Laboratório" required/><br>
  
      <label for="maq_qt">Quantidade de Máquinas</label>
      <input type="number" name="maq_qt" title="Quantidade de Máquinas" required/><br>
  
      <button>Enviar</button><br>
  
    </form>
  </div>

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