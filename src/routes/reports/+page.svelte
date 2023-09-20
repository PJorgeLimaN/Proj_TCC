<script>
	import { linear } from 'svelte/easing';
	import Page from '../hub/+page.svelte';

    export let data;
    //console.log(data.data);
</script>

<div>
    <form method="post" action="/hub?/send_err">
  
      <label for="lab_id">Laboratório</label>
      <select name="lab_id" title="laboratório">
        {#each data.Page as labs}
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
        <th>Status</th>
      </tr>
      
      {#each data.data as error}
      
        <tr>
          <td>{error.error_id}</td>
          <td>{error.lab}</td>
          <td>{error.error_maq}</td>
          <td>{error.description}</td>
          <td>{error.isFixed}</td>
          
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