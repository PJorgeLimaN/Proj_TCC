<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export let data;

	const usrType = data.typeUsr || 0;
	const usrName = data.nameUsr || '';
	const usrId = data.idUsr || 0;
	
	
    const labs = data.lab;
	const maqs = data.maqs || [];

	let maq = '';
	
    
	/* Possibilidades:
    Como é uma tela para editar um laboratório, pode também ser utilizada como tela para ver um laboratório específico e os erros pertinentes somente aquele laboratório
    Algo como se o usuário clicar no botão de editar envia um código e se clicar no laboratório em si ele envia outro
    Ou se for apenas um professor aparece somente as informações do laboratório mas sem o botão de enviar os dados novos.
    
*/
</script>

<body>
	
	<section class="container">
		<div>
			<h1>Laboratório {labs?.lab_name}</h1>
			<h1>Selecione a máquina.</h1>
			<form action="/maqs/{maq}" method="GET">
				<select name="id" title="Máquina" placeholder="Maquina" bind:value={maq}>
					{#each maqs as maqs}
						<option value={maqs.maqId}>{maqs.maqNum}</option>	
					{/each}
				</select>

				<input type="submit" value="Selecionar Máquina">
			</form>
		</div>
	</section>

	{#if +usrType > 0 && +usrType < 4 }
	<!-- {#if +usrType > 0 && +usrType < 3 }
	<section class="container">
		// NAO EXISTE MUDANÇA AO EDITAR UM LABORATÓRIO, LOGO, ESSA PARTE DO CÓDIGO PARA EDIÇÃO DE MÁQUINAS FOI REMOVIDA.
		<div>
			<form>
				<form action="/labs?/updateLab" method="post">
					<div>
						<label for="labId">ID do Laboratório</label>
						<input type="text" name="labId" id="labId" readonly value={labs?.lab_id} />
					</div>

					<div>
						<label for="labName">Nome do Laboratório</label>
						<input type="text" name="labName" id="labName" value={labs?.lab_name} />
					</div>

					<div>
						<label for="maqs">Quantidade de Máquinas</label>
						<input type="number" name="maqs" id="maqs" value={labs?.maqs} readonly/>
					</div>

					<input type="submit" value="Atualizar" />

					<a href="./" class="button">Voltar</a>
				</form>
			</form>
		</div>
	</section>
	{/if} -->

	<section class="container">
		<div>
			<table>
				<tr>
					{#if +usrType < 4 && +usrType > 0}
						<th>ID da Máquina</th>
					{/if}
					<th>Máquina</th>
					<th>Quantidade de Erros</th>
					<th></th>
				</tr>

				{#each maqs as maq}
					<tr>
						{#if +usrType < 4 && +usrType > 0}
							<td>{maq.maqId}</td>
						{/if}
						
						<td>{maq.maqNum}</td>

						{#if maq._count.errors > 0}
          				<td style="background-color: crimson;">{maq._count.errors}</td>
          				{:else}
          				<td>{maq._count.errors}</td>
          				{/if}

						<td><a href="/maqs/{maq.maqId}" class="button">Ver Máquina</a></td>
						<!-- {@debug error} -->
					</tr>
				{/each}
			</table>
		</div>
		<a href="./" class="button">Voltar</a>
	</section>
	{/if}

	<form>

	</form>
	
</body>

<svelte:head>
	<title>CIET | Laboratório {labs?.lab_name}</title>
	<!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
	<meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET." />
</svelte:head>
