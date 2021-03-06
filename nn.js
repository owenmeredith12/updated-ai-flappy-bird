class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

class NeuralNetwork{
  constructor(a, b, c){
    if(a instanceof NeuralNetwork){
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;
      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();
      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();

    }else{
  this.input_nodes = a;
  this.hidden_nodes = b;
  this.output_nodes = c;

  this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
  this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
  this.weights_ih.randomize();
  this.weights_ho.randomize();

  this.bias_h = new Matrix(this.hidden_nodes,1);
  this.bias_o = new Matrix(this.output_nodes,1);
  this.bias_h.randomize();
  this.bias_o.randomize();
  }
  this.setActivationFunction();
  this.setLearningRate();
}

  predict(input_array){

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);

    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activation_function.func);

    return output.toArray();
  }

//-------------------------------------------------

  setLearningRate(learning_rate = 0.2) {
  this.learning_rate = learning_rate;
}

setActivationFunction(func = sigmoid) {
  this.activation_function = func;
}
//-----------------------------------
  train(input_array, target_array){
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(this.activation_function.func);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activation_function.func);

    let targets = Matrix.fromArray(target_array);
    let output_errors = Matrix.subtract(targets, outputs);
    //let gradient = outputs
    let gradients = Matrix.map(outputs, this.activation_function.dfunc);
    gradients.multiply(output_errors);
    gradients.multiply(this.lr);



    let hidden_t = Matrix.transpose(hidden);
    let weights_ho_deltas = Matrix.multiply(gradients, hidden_t);
    this.weights_ho.add(weights_ho_deltas);
    this.bias_o.add(gradients);

    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    let hidden_gradient = Matrix.map(hidden, this.activation_function.dfunc);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);

    let inputs_t = Matrix.transpose(inputs);
    let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_t);

    this.weights_ih.add(weights_ih_deltas);
    this.bias_h.add(hidden_gradient);
    //outputs.print();
    //targets.print();
    //error.print();
  }

  copy(){
      return new NeuralNetwork(this);
  }

  mutate(rate){
    function mutate(val){
      if(Math.random() < rate){
      //return Math.random() *2-1;
      return val + randomGaussian(0, 0.1);
    }else{
      return val;
    }
  }


    this.weights_ih.map(mutate);
    this.weights_ho.map(mutate);
    this.bias_h.map(mutate);
    this.bias_o.map(mutate);

  }

}
