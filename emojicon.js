const outputElement = document.getElementById('emojicons');
    const l = ["0.0", "O.O", "o.o", "...", "o.o", "O.O"];
    
    function printToTerminal() {
      let index = 0;
      setInterval(function() {
        outputElement.textContent = l[index];
        index = (index + 1) % l.length;
      }, 150);
    }

    // Start the animation
    printToTerminal();
