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
    let scene = await engine.scene.create();

    let page = engine.block.create("page");
    // engine.block.setWidthMode(page, "Percent");
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

    let solidColor = engine.block.createFill("color");
    const color1 = { r: 1, g: 0.9, b: 0.2, a: 1 };
    const color2 = { r: 1, g: 0.3, b: 0, a: 1 };
    engine.block.setColor(solidColor, "fill/color/value", color1);

    let block = engine.block.create("graphic");
    engine.block.setShape(block, engine.block.createShape("ellipse"));
    engine.block.setFill(block, solidColor);
    engine.block.setStrokeEnabled(block, true);
    engine.block.setStrokeColor(block, color2);
    engine.block.appendChild(page, block);
    engine.block.setPositionX(block, 0.25);
    engine.block.setPositionXMode(block, "Percent");
    engine.block.setPositionY(block, 0.25);
    engine.block.setPositionYMode(block, "Percent");

    let blob = engine.block.create("graphic");
    engine.block.setShape(blob, engine.block.createShape("ellipse"));
    engine.block.setFill(blob, solidColor);
    engine.block.setStrokeEnabled(blob, true);
    engine.block.setStrokeColor(blob, color2);

    engine.block.appendChild(page, blob);
    engine.block.setPositionX(blob, 0.7);
    engine.block.setPositionXMode(blob, "Percent");
    engine.block.setPositionY(blob, 0.55);
    engine.block.setPositionYMode(blob, "Percent");

    let line = engine.block.create("graphic");
    let lineFill = engine.block.createFill("color");
    const lineColor = { r: 0.8, g: 0.2, b: 1, a: 0.8 };
    engine.block.setColor(lineFill, "fill/color/value", lineColor);
    engine.block.setShape(line, engine.block.createShape("line"));
    engine.block.setFill(line, lineFill);
    engine.block.setHeight(line, 3);

    engine.block.appendChild(page, line);

    //edge between nodes
    setInterval(() => {
      const x1 =
        engine.block.getPositionX(block) +
        engine.block.getWidth(block) / (2 * pageWidth);
      const y1 =
        engine.block.getPositionY(block) +
        engine.block.getHeight(block) / (2 * pageHeight);
      const x2 =
        engine.block.getPositionX(blob) +
        engine.block.getWidth(blob) / (2 * pageWidth);
      const y2 =
        engine.block.getPositionY(blob) +
        engine.block.getHeight(blob) / (2 * pageHeight);

      engine.block.setWidth(line, distance(x1, y1, x2, y2) * pageWidth);
      engine.block.setPositionX(line, x1);
      engine.block.setPositionXMode(line, "Percent");
      engine.block.setPositionY(line, y1);
      engine.block.setPositionYMode(line, "Percent");
      let angle = Math.acos(cos(x2 - x1, y2 - y1, 1, 0)); //angle b/w (1,0) and vector pointing from point1 to point2
      engine.block.setRotation(line, angle);
      engine.block.sendToBack(line);
    }, 30);

    let toggle = 0.01;
    setInterval(() => {
      let xCoord = 0.25 + toggle;
      engine.block.setPositionX(block, xCoord);
      toggle = (toggle + 0.01) % 0.5;
    }, 100);

    //append scene to HTML
    document.getElementById("cesdk_container").append(engine.element);
  });
} else {
  alert("Unsupported browser detected");
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function dot(x1, y1, x2, y2) {
  const dot = x1 * x2 + y1 * y2;
  console.log(dot);
  return dot;
}

function cos(x1, y1, x2, y2) {
  const mag1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
  const mag2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
  console.log(mag1, mag2);
  const cos = dot(x1, y1, x2, y2) / (mag1 * mag2);
  console.log(cos);
  return cos;
}
