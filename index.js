const dagre = require('dagre')

const NODE_SIZE = 45;

function layouter(flow) {
    // Create a new directed graph 
    let maing= new dagre.graphlib.Graph();

    // Set an object for the graph label
    maing.setGraph({rankdir: "LR", nodesep: 100, marginx: 50, marginy: 50 });

    // Default to assigning a new object as a label for each new edge.
    maing.setDefaultEdgeLabel(function() { return {}; });

    let mainNodes = getNodes('main.flow', flow);

    // Create nodes for the main graph
    mainNodes.forEach(n => {
        maing.setNode(n.id, {label: n.name, width: NODE_SIZE, height: NODE_SIZE })
    });

    // Create the edges for the main graph
    mainNodes.forEach(n => {
        let source = n.id;
        let target;
        n.wires.forEach(e => {
            target = e[0];
            maing.setEdge(source, target)
        })
    });

    dagre.layout(maing);

    // replace the coordinates of the original flow
    maing.nodes().forEach(nid => {
        if (nid){
            console.log(`Applying positioning to ${nid}...`);
            let node = flow.find(n => n.id === nid);
            if (node) {
                node.x = maing.node(nid).x;
                node.y = maing.node(nid).y;
                // console.log('Original node repositioned to: ', JSON.stringify(node));
            }
        }
    });

    console.log(JSON.stringify(flow));
    
   
    // Printing results
    // maing.nodes().forEach(function(v) {
    //     console.log("Node " + v + ": " + JSON.stringify(maing.node(v)));
    // });
    // console.log('------')
    // g.edges().forEach(function(e) {
    //     console.log("Edge " + e.v + " -> " + e.w + ": " + JSON.stringify(g.edge(e)));
    // });
    
}

function getNodes(tab, flow) {
    return flow.filter(n => n.z === tab)
}

module.exports = layouter