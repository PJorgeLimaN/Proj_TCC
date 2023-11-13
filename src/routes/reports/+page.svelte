<script>
	import { linear } from 'svelte/easing';
	import Page from '../hub/+page.svelte';

    export let data; // Forma geral de todos os dados que chegam na página //let é basicamente um var, que não pode ser redeclarado, a menos que dentro de um bloco {}, como um if ou iguais.
    export let form;

    const errD = data.errData; // Escolhendo especificamente uma parte dos dados enviados a pagina
    const labD = data.labData;
    const usrType = data.typeUsr || 0;
    const usrName = data.nameUsr || "";
    const usrId = data.idUsr || 0;
</script>


  <br>
  
  <section class="show-error">
  
    <table>
      <tr>
          {#if (+usrType < 4) && (+usrType > 0)}
        <th>ID do Erro</th>
          {/if}
        <th>Laboratório</th>
        <th>Máquina</th>
        <th>Descrição</th>
        <th>Status</th>
          {#if (+usrType < 4) && (+usrType > 0)}
        <th>Criado por</th>
        <th>Criado</th>
        <th>Editado</th>
          {/if}
      </tr>
      
      {#each errD as error}
      
        <tr>
            {#if (+usrType < 4) && (+usrType > 0)}
          <td>{error.error_id}</td>
            {/if}
          <td>{error.labs.lab_name}</td>
          <td>{error.error_maq}</td>
          <td>{error.description}</td>
          
          {#if error.isFixed == 0}
          <td>Não Resolvido</td>
          {:else if error.isFixed == 1}
          <td>Resolvido</td>
          {/if}
          
            {#if (+usrType < 4) && (+usrType > 0)}
          <td>{error.users.user_name}</td>
          <td>{error.create_time.toLocaleString()}</td>
          <td>{error.modified_time?.toLocaleString()}</td>
          <td>
              <form method="POST" action="/maqs?/deleteEntry">
                <input type="hidden" name="id" value={error.error_id} />
                <button>Remover</button>
              </form>
          </td>
          <td>
              <a href="/maqs/{error.error_id}" class="button">Editar</a>
          </td>
            {/if}
          <!-- {@debug error} -->
          
        </tr>
      
      {/each}
    </table>
  
  </section>