import React, { useEffect, useRef } from "react"

async function loadAsync(src) {
  const script = document.createElement("script")
  script.src = src
  script.async = false
  return new Promise((resolve, reject) => {
    script.addEventListener("load", function() {
      resolve(true)
    })
    document.getElementsByTagName("head")[0].appendChild(script)
  })
}

const Torus = ({ css }) => {
  const div = useRef()
  useEffect(() => {
    Promise.all(["/fireworks-bundle.js", "/tquery-bundle.js"].map(loadAsync))
      .catch(alert)
      .then(() => {
        const { tQuery, Fireworks, THREE } = window

        var world = tQuery
          .createWorld()
          .appendTo(div.current)
          .boilerplate()
          .start()
        var object = tQuery
          .createTorus(0.8, 0.2, 32, 32)
          .addTo(world)
          .rotateZ((1 * Math.PI) / 8)
        world
          .tRenderer()
          .setClearColorHex(0x000000, world.tRenderer().getClearAlpha())
        var url = "../assets/images/tremulous/psaw/blue_particle.jpg"
        var texture = THREE.ImageUtils.loadTexture(url)
        var emitter = Fireworks.createEmitter({ nParticles: 80 })
          .effectsStackBuilder()
          .spawnerSteadyRate(25)
          .position(Fireworks.createShapeSphere(0, 0, 0, 0.6))
          .lifeTime(0.5)
          .createEffect("scale", {
            birthScale: 1 / 12,
            mulScale: 0.88,
          })
          .onBirth(function(particle, deltaTime) {
            var object3d = particle.get("threejsObject3D").object3d
            var birthScale = this.opts.birthScale
            object3d.scale.set(birthScale, birthScale, birthScale)
          })
          .onUpdate(function(particle, deltaTime) {
            var object3d = particle.get("threejsObject3D").object3d
            object3d.scale.multiplyScalar(this.opts.mulScale)
          })
          .back()
          .renderToThreejsObject3D({
            container: world,
            create: function() {
              var object3d = new THREE.Sprite({
                color: 0xaa4488,
                useScreenCoordinates: false,
                map: texture,
                blending: THREE.AdditiveBlending,
                transparent: true,
              })
              object3d.rotation = Math.random() * Math.PI * 2
              return object3d
            },
          })
          .back()
          .start()
        world.loop().hook(function(delta, now) {
          emitter.update(delta).render()
        })
      })
  }, [])
  return <div {...{ css }} ref={div} />
}

export default Torus
