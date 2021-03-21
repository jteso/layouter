const dagre = require('dagre')

const NODE_SIZE = 45;
const NODE_PROPS = { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE }
// Create a new directed graph 
let g= new dagre.graphlib.Graph();

// Set an object for the graph label
g.setGraph({rankdir: "LR", nodesep: 100, marginx: 50, marginy: 50 });

// Default to assigning a new object as a label for each new edge.
g.setDefaultEdgeLabel(function() { return {}; });

// Add nodes
g.setNode('EventListener', { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE }); // EventListener
g.setNode('Logger', { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE }); // Logger
g.setNode('SetProperty', { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE });  // Set Property
g.setNode('Function', { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE });  // Function
g.setNode('EventListenerEnd', { label: 'example of label', width: NODE_SIZE, height: NODE_SIZE });  // EventListenerEnd

// Add edges to the graph.
g.setEdge("EventListener",   "Logger");
g.setEdge("Logger", "SetProperty");
g.setEdge("SetProperty",     "Function");
g.setEdge("Function",     "EventListenerEnd");

dagre.layout(g);

// Printing results
g.nodes().forEach(function(v) {
    console.log("Node " + v + ": " + JSON.stringify(g.node(v)));
});
// console.log('------')
// g.edges().forEach(function(e) {
//     console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
// });
