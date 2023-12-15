<script lang="ts">
    export const labData = "";
</script>

<section class="insert">
    <div>
      <form method="post" action="/labs?/addLab">
      
        <label for="lab_nome">Nome do Laboratório</label>
        <input type="text" name="lab_nome" title="Nome do Laboratório" required/><br>
      
        <label for="maq_qt">Quantidade de Máquinas</label>
        <input type="number" name="maq_qt" title="Quantidade de Máquinas (Sem contar com a máquina do Professor.)" required/><br>
        (Sem contar com a máquina do professor.)<br>
      
        <button>Enviar</button><br>
      
      </form>
    </div>
  </section>