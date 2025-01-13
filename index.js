import CreativeEngine, {
  supportsWasm,
} from "https://cdn.img.ly/packages/imgly/cesdk-engine/1.41.1/index.js";

const config = {
  // license: "mtLT-_GJwMhE7LDnO8KKEma7qSuzWuDxiKuQcxHKmz3fjaXWY2lT3o3Z2VdL5twm",
  license: "7mWtAxNhFkNN1x2RmFuaLst6UyRuEU-a0swJNYdr6BevIXyezk8yVcS7jgKRtfxR",
  userId: "guides-user",
  baseURL: "https://cdn.img.ly/packages/imgly/cesdk-engine/1.41.1/assets",
};

if (
  supportsWasm()
  // If you use video in your scene you can check if the browser supports it as well.
  // supportsVideo()
) {
  CreativeEngine.init(config).then(async (engine) => {
    //SETTING SOME VARIABLES
    const color1 = { r: 1, g: 0.9, b: 0.2, a: 1 };
    const color2 = { r: 1, g: 0.3, b: 0, a: 1 };
    const lineColor = { r: 0.8, g: 0.2, b: 1, a: 0.8 };
    let nodeFill = engine.block.createFill("color");
    engine.block.setColor(nodeFill, "fill/color/value", color1);

    //DECLARING FUNCTIONS
    function createNode() {
      let node = engine.block.create("graphic");
      engine.block.setShape(node, engine.block.createShape("ellipse"));
      engine.block.setFill(node, nodeFill);
      engine.block.setStrokeEnabled(node, true);
      engine.block.setStrokeColor(node, color2);
      return node;
    }

    function updateEdge(edge, start, end) {
      const x1 =
        engine.block.getPositionX(block) + engine.block.getWidth(block) / 2;
      const y1 =
        engine.block.getPositionY(block) + engine.block.getHeight(block) / 2;
      const x2 =
        engine.block.getPositionX(blob) + engine.block.getWidth(blob) / 2;
      const y2 =
        engine.block.getPositionY(blob) + engine.block.getHeight(blob) / 2;

      engine.block.setWidth(line, distance(x1, y1, x2, y2));
      engine.block.setPositionX(line, x1);
      engine.block.setPositionY(line, y1);
      let angle = Math.acos(cos(x2 - x1, y2 - y1, 1, 0)); //angle b/w (1,0) and vector pointing from point1 to point2
      engine.block.setRotation(line, angle);
    }

    function getEdgeCoords(start, end) {
      let result = [];

      //get coords
      result[0] =
        engine.block.getPositionX(start) + engine.block.getWidth(start) / 2;
      result[1] =
        engine.block.getPositionY(start) + engine.block.getHeight(start) / 2;
      result[2] =
        engine.block.getPositionX(end) + engine.block.getWidth(end) / 2;
      result[3] =
        engine.block.getPositionY(end) + engine.block.getHeight(end) / 2;

      return result;
    }

    //DRAWING THE SCENE
    let scene = await engine.scene.create();

    //page
    let page = engine.block.create("page");
    engine.block.setWidth(page, 1000);
    engine.block.setHeight(page, 1000);
    // const pages = engine.scene.getPages();
    const pageWidth = engine.block.getWidth(page);
    const pageHeight = engine.block.getHeight(page);
    engine.block.setPositionX(page, -pageWidth / 2);
    engine.block.setPositionY(page, -pageHeight / 2);
    engine.block.setFill(page, engine.block.createFill("color"));
    engine.block.appendChild(scene, page);
    // const pageProps = engine.block.findAllProperties(page);
    // console.log(pageProps);

    //shapes
    let block = createNode();
    engine.block.appendChild(page, block);
    engine.block.setPositionX(block, 250);
    engine.block.setPositionY(block, 250);

    let blob = createNode();
    engine.block.appendChild(page, blob);
    engine.block.setPositionX(blob, 700);
    engine.block.setPositionY(blob, 550);

    let line = engine.block.create("graphic");
    let lineFill = engine.block.createFill("color");
    engine.block.setColor(lineFill, "fill/color/value", lineColor);
    engine.block.setShape(line, engine.block.createShape("line"));
    engine.block.setFill(line, lineFill);
    engine.block.setHeight(line, 3);

    engine.block.appendChild(page, line);
    engine.block.sendToBack(line);

    // setInterval(updateEdge(line, block, blob), 30);
    // updateEdge(line, block, blob);

    setInterval(() => {
      let edgeCoords = getEdgeCoords(block, blob);
      const x1 = edgeCoords[0];
      const y1 = edgeCoords[1];
      const x2 = edgeCoords[2];
      const y2 = edgeCoords[3];
      engine.block.setWidth(line, distance(x1, y1, x2, y2));
      engine.block.setPositionX(line, x1);
      engine.block.setPositionY(line, y1);
      let angle = Math.acos(cos(x2 - x1, y2 - y1, 1, 0)); //angle b/w (1,0) and vector pointing from point1 to point2
      engine.block.setRotation(line, angle);
    }, 30);

    //APPEND SCENE TO HTML
    document.getElementById("cesdk_container").append(engine.element);
  });
} else {
  alert("Unsupported browser detected");
}

//HELPER FUNCTIONS
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function dot(x1, y1, x2, y2) {
  const dot = x1 * x2 + y1 * y2;
  // console.log(dot);
  return dot;
}

function cos(x1, y1, x2, y2) {
  const mag1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
  const mag2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
  // console.log(mag1, mag2);
  const cos = dot(x1, y1, x2, y2) / (mag1 * mag2);
  // console.log(cos);
  return cos;
}
