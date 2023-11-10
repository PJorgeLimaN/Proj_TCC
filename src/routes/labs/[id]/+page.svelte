<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export let data;

	const usrType = data.typeUsr || 0;
	const usrName = data.nameUsr || '';
	const usrId = data.idUsr || 0;
    const labs = data.lab;
	const ers = data.lab?.errors || [];
    
	/* Possibilidades:
    Como é uma tela para editar um laboratório, pode também ser utilizada como tela para ver um laboratório específico e os erros pertinentes somente aquele laboratório
    Algo como se o usuário clicar no botão de editar envia um código e se clicar no laboratório em si ele envia outro
    Ou se for apenas um professor aparece somente as informações do laboratório mas sem o botão de enviar os dados novos.
    
*/
</script>

<body>
	<section class="container">
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
						<input type="number" name="maqs" id="maqs" value={labs?.maqs} />
					</div>

					<input type="submit" value="Atualizar" />

					<a href="./" class="button">Voltar</a>
				</form>
			</form>
		</div>
	</section>

	<section class="container">
		<div>
			<table>
				<tr>
					{#if +usrType < 4 && +usrType > 0}
						<th>ID do Erro</th>
					{/if}
					<th>Máquina</th>
					<th>Descrição</th>
					<th>Status</th>
					{#if +usrType < 4 && +usrType > 0}
						<th>Criado por</th>
						<th>Criado</th>
						<th>Editado</th>
					{/if}
				</tr>

				{#each ers as erros}
					<tr>
						{#if +usrType < 4 && +usrType > 0}
							<td>{erros.error_id}</td>
						{/if}
						<td>{erros.error_maq}</td>
						<td>{erros.description}</td>

						{#if erros.isFixed == 0}
							<td>Não Resolvido</td>
						{:else if erros.isFixed == 1}
							<td>Resolvido</td>
						{/if}

						{#if +usrType < 4 && +usrType > 0}
							<td>{erros.users.user_name}</td>
							<td>{erros.create_time.toLocaleString()}</td>
							<td>{erros.modified_time?.toLocaleString()}</td>
						{/if}
						<!-- {@debug error} -->
					</tr>
				{/each}
			</table>
		</div>
	</section>
</body>

<svelte:head>
	<title>CIET | Laboratório {labs?.lab_name}</title>
	<!-- Chamado de maqs por erro inicial meu, mas visto que os erros estão ligados as máquinas não tem muito problema.-->
	<meta name="description" content="Página de Gerenciamento de Erros das máquinas do CIET." />
</svelte:head>
