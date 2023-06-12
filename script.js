document.getElementById("formTask").addEventListener("submit", function(event){
    event.preventDefault();

    var tarefa = document.getElementById("task").value;

      var paragrafo = document.createElement("p"); // Cria um novo elemento <p>
      paragrafo.textContent = tarefa;

      var container = document.getElementById("tarefasContainer");
      container.appendChild(paragrafo); // Adiciona o parágrafo ao container

      document.getElementById("task").value = "";
    
});