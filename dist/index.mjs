var ue = Object.defineProperty, ie = (e, o, t) => o in e ? ue(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t, P = (e, o, t) => (ie(e, typeof o != "symbol" ? o + "" : o, t), t), ce = (e, o, t) => {
  if (!o.has(e))
    throw TypeError("Cannot " + t);
}, L = (e, o) => {
  if (Object(o) !== o)
    throw TypeError('Cannot use the "in" operator on this value');
  return e.has(o);
}, S = (e, o, t) => {
  if (o.has(e))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(e) : o.set(e, t);
}, z = (e, o, t) => (ce(e, o, "access private method"), t);
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function F(e, o) {
  return Object.is(e, o);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
let i = null, x = !1, E = 1;
const b = /* @__PURE__ */ Symbol("SIGNAL");
function C(e) {
  const o = i;
  return i = e, o;
}
function se() {
  return i;
}
function de() {
  return x;
}
const $ = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {
  },
  consumerMarkedDirty: () => {
  },
  consumerOnSignalRead: () => {
  }
};
function k(e) {
  if (x)
    throw new Error(
      typeof ngDevMode < "u" && ngDevMode ? "Assertion error: signal read during notification phase" : ""
    );
  if (i === null)
    return;
  i.consumerOnSignalRead(e);
  const o = i.nextProducerIndex++;
  if (T(i), o < i.producerNode.length && i.producerNode[o] !== e && W(i)) {
    const t = i.producerNode[o];
    M(t, i.producerIndexOfThis[o]);
  }
  i.producerNode[o] !== e && (i.producerNode[o] = e, i.producerIndexOfThis[o] = W(i) ? K(e, i, o) : 0), i.producerLastReadVersion[o] = e.version;
}
function le() {
  E++;
}
function H(e) {
  if (!(W(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === E)) {
    if (!e.producerMustRecompute(e) && !ve(e)) {
      e.dirty = !1, e.lastCleanEpoch = E;
      return;
    }
    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = E;
  }
}
function J(e) {
  if (e.liveConsumerNode === void 0)
    return;
  const o = x;
  x = !0;
  try {
    for (const t of e.liveConsumerNode)
      t.dirty || pe(t);
  } finally {
    x = o;
  }
}
function ae() {
  return (i == null ? void 0 : i.consumerAllowSignalWrites) !== !1;
}
function pe(e) {
  var o;
  e.dirty = !0, J(e), (o = e.consumerMarkedDirty) == null || o.call(e.wrapper ?? e);
}
function he(e) {
  return e && (e.nextProducerIndex = 0), C(e);
}
function fe(e, o) {
  if (C(o), !(!e || e.producerNode === void 0 || e.producerIndexOfThis === void 0 || e.producerLastReadVersion === void 0)) {
    if (W(e))
      for (let t = e.nextProducerIndex; t < e.producerNode.length; t++)
        M(e.producerNode[t], e.producerIndexOfThis[t]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
  }
}
function ve(e) {
  T(e);
  for (let o = 0; o < e.producerNode.length; o++) {
    const t = e.producerNode[o], l = e.producerLastReadVersion[o];
    if (l !== t.version || (H(t), l !== t.version))
      return !0;
  }
  return !1;
}
function K(e, o, t) {
  var l;
  if (G(e), T(e), e.liveConsumerNode.length === 0) {
    (l = e.watched) == null || l.call(e.wrapper);
    for (let c = 0; c < e.producerNode.length; c++)
      e.producerIndexOfThis[c] = K(e.producerNode[c], e, c);
  }
  return e.liveConsumerIndexOfThis.push(t), e.liveConsumerNode.push(o) - 1;
}
function M(e, o) {
  var t;
  if (G(e), T(e), typeof ngDevMode < "u" && ngDevMode && o >= e.liveConsumerNode.length)
    throw new Error(`Assertion error: active consumer index ${o} is out of bounds of ${e.liveConsumerNode.length} consumers)`);
  if (e.liveConsumerNode.length === 1) {
    (t = e.unwatched) == null || t.call(e.wrapper);
    for (let c = 0; c < e.producerNode.length; c++)
      M(e.producerNode[c], e.producerIndexOfThis[c]);
  }
  const l = e.liveConsumerNode.length - 1;
  if (e.liveConsumerNode[o] = e.liveConsumerNode[l], e.liveConsumerIndexOfThis[o] = e.liveConsumerIndexOfThis[l], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, o < e.liveConsumerNode.length) {
    const c = e.liveConsumerIndexOfThis[o], g = e.liveConsumerNode[o];
    T(g), g.producerIndexOfThis[c] = o;
  }
}
function W(e) {
  var o;
  return e.consumerIsAlwaysLive || (((o = e == null ? void 0 : e.liveConsumerNode) == null ? void 0 : o.length) ?? 0) > 0;
}
function T(e) {
  e.producerNode ?? (e.producerNode = []), e.producerIndexOfThis ?? (e.producerIndexOfThis = []), e.producerLastReadVersion ?? (e.producerLastReadVersion = []);
}
function G(e) {
  e.liveConsumerNode ?? (e.liveConsumerNode = []), e.liveConsumerIndexOfThis ?? (e.liveConsumerIndexOfThis = []);
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Q(e) {
  if (H(e), k(e), e.value === V)
    throw e.error;
  return e.value;
}
function we(e) {
  const o = Object.create(me);
  o.computation = e;
  const t = () => Q(o);
  return t[b] = o, t;
}
const q = /* @__PURE__ */ Symbol("UNSET"), A = /* @__PURE__ */ Symbol("COMPUTING"), V = /* @__PURE__ */ Symbol("ERRORED"), me = {
  ...$,
  value: q,
  dirty: !0,
  error: null,
  equal: F,
  producerMustRecompute(e) {
    return e.value === q || e.value === A;
  },
  producerRecomputeValue(e) {
    if (e.value === A)
      throw new Error("Detected cycle in computations.");
    const o = e.value;
    e.value = A;
    const t = he(e);
    let l, c = !1;
    try {
      l = e.computation.call(e.wrapper), c = o !== q && o !== V && e.equal.call(e.wrapper, o, l);
    } catch (g) {
      l = V, e.error = g;
    } finally {
      fe(e, t);
    }
    if (c) {
      e.value = o;
      return;
    }
    e.value = l, e.version++;
  }
};
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function ge() {
  throw new Error();
}
let ye = ge;
function Ne() {
  ye();
}
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function Ce(e) {
  const o = Object.create(Ie);
  o.value = e;
  const t = () => (k(o), o.value);
  return t[b] = o, t;
}
function Te() {
  return k(this), this.value;
}
function xe(e, o) {
  ae() || Ne(), e.equal.call(e.wrapper, e.value, o) || (e.value = o, Se(e));
}
const Ie = {
  ...$,
  equal: F,
  value: void 0
};
function Se(e) {
  e.version++, le(), J(e);
}
/**
 * @license
 * Copyright 2024 Bloomberg Finance L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const d = Symbol("node");
let y, w, N;
var m;
((e) => {
  var o, t, l, c;
  class g {
    constructor(v, p = {}) {
      S(this, t), P(this, o);
      const s = Ce(v)[b];
      if (this[d] = s, s.wrapper = this, p) {
        const f = p.equals;
        f && (s.equal = f), s.watched = p[e.subtle.watched], s.unwatched = p[e.subtle.unwatched];
      }
    }
    get() {
      if (!y(this))
        throw new TypeError(
          "Wrong receiver type for Signal.State.prototype.get"
        );
      return Te.call(this[d]);
    }
    set(v) {
      if (!y(this))
        throw new TypeError(
          "Wrong receiver type for Signal.State.prototype.set"
        );
      if (de())
        throw new Error(
          "Writes to signals not permitted during Watcher callback"
        );
      const p = this[d];
      xe(p, v);
    }
  }
  o = d, t = /* @__PURE__ */ new WeakSet(), y = (a) => L(t, a), e.State = g;
  class X {
    // Create a Signal which evaluates to the value returned by the callback.
    // Callback is called with this signal as the parameter.
    constructor(v, p) {
      S(this, c), P(this, l);
      const s = we(v)[b];
      if (s.consumerAllowSignalWrites = !0, this[d] = s, s.wrapper = this, p) {
        const f = p.equals;
        f && (s.equal = f), s.watched = p[e.subtle.watched], s.unwatched = p[e.subtle.unwatched];
      }
    }
    get() {
      if (!w(this))
        throw new TypeError(
          "Wrong receiver type for Signal.Computed.prototype.get"
        );
      return Q(this[d]);
    }
  }
  l = d, c = /* @__PURE__ */ new WeakSet(), w = (a) => L(c, a), e.Computed = X, ((a) => {
    var v, p, s, f;
    function Y(u) {
      let n, r = null;
      try {
        r = C(null), n = u();
      } finally {
        C(r);
      }
      return n;
    }
    a.untrack = Y;
    function Z(u) {
      var n;
      if (!w(u) && !N(u))
        throw new TypeError(
          "Called introspectSources without a Computed or Watcher argument"
        );
      return ((n = u[d].producerNode) == null ? void 0 : n.map((r) => r.wrapper)) ?? [];
    }
    a.introspectSources = Z;
    function _(u) {
      var n;
      if (!w(u) && !y(u))
        throw new TypeError("Called introspectSinks without a Signal argument");
      return ((n = u[d].liveConsumerNode) == null ? void 0 : n.map((r) => r.wrapper)) ?? [];
    }
    a.introspectSinks = _;
    function ee(u) {
      if (!w(u) && !y(u))
        throw new TypeError("Called hasSinks without a Signal argument");
      const n = u[d].liveConsumerNode;
      return n ? n.length > 0 : !1;
    }
    a.hasSinks = ee;
    function oe(u) {
      if (!w(u) && !N(u))
        throw new TypeError("Called hasSources without a Computed or Watcher argument");
      const n = u[d].producerNode;
      return n ? n.length > 0 : !1;
    }
    a.hasSources = oe;
    class te {
      // When a (recursive) source of Watcher is written to, call this callback,
      // if it hasn't already been called since the last `watch` call.
      // No signals may be read or written during the notify.
      constructor(n) {
        S(this, p), S(this, s), P(this, v);
        let r = Object.create($);
        r.wrapper = this, r.consumerMarkedDirty = n, r.consumerIsAlwaysLive = !0, r.consumerAllowSignalWrites = !1, r.producerNode = [], this[d] = r;
      }
      // Add these signals to the Watcher's set, and set the watcher to run its
      // notify callback next time any signal in the set (or one of its dependencies) changes.
      // Can be called with no arguments just to reset the "notified" state, so that
      // the notify callback will be invoked again.
      watch(...n) {
        if (!N(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        z(this, s, f).call(this, n);
        const r = this[d];
        r.dirty = !1;
        const I = C(r);
        for (const h of n)
          k(h[d]);
        C(I);
      }
      // Remove these signals from the watched set (e.g., for an effect which is disposed)
      unwatch(...n) {
        if (!N(this))
          throw new TypeError("Called unwatch without Watcher receiver");
        z(this, s, f).call(this, n);
        const r = this[d];
        T(r);
        let I = [];
        for (let h = 0; h < r.producerNode.length; h++)
          n.includes(r.producerNode[h].wrapper) && (M(r.producerNode[h], r.producerIndexOfThis[h]), I.push(h));
        for (const h of I) {
          const U = r.producerNode.length - 1;
          if (r.producerNode[h] = r.producerNode[U], r.producerIndexOfThis[h] = r.producerIndexOfThis[U], r.producerNode.length--, r.producerIndexOfThis.length--, r.nextProducerIndex--, h < r.producerNode.length) {
            const ne = r.producerIndexOfThis[h], B = r.producerNode[h];
            G(B), B.liveConsumerIndexOfThis[ne] = h;
          }
        }
      }
      // Returns the set of computeds in the Watcher's set which are still yet
      // to be re-evaluated
      getPending() {
        if (!N(this))
          throw new TypeError("Called getPending without Watcher receiver");
        return this[d].producerNode.filter((n) => n.dirty).map((n) => n.wrapper);
      }
    }
    v = d, p = /* @__PURE__ */ new WeakSet(), s = /* @__PURE__ */ new WeakSet(), f = function(u) {
      for (const n of u)
        if (!w(n) && !y(n))
          throw new TypeError(
            "Called watch/unwatch without a Computed or State argument"
          );
    }, N = (u) => L(p, u), a.Watcher = te;
    function re() {
      var u;
      return (u = se()) == null ? void 0 : u.wrapper;
    }
    a.currentComputed = re, a.watched = Symbol("watched"), a.unwatched = Symbol("unwatched");
  })(e.subtle || (e.subtle = {}));
})(m || (m = {}));
let D = !0;
const R = new m.subtle.Watcher(() => {
  D && (D = !1, queueMicrotask(Oe));
});
function Oe() {
  D = !0;
  for (const e of R.getPending())
    e.get();
  R.watch();
}
function Ee(e) {
  let o;
  const t = new m.Computed(() => {
    typeof o == "function" && o(), o = e();
  });
  return R.watch(t), t.get(), () => {
    R.unwatch(t), typeof o == "function" && o();
  };
}
let O = null;
const j = new m.State(0), be = new m.Computed(() => (j.get() & 1) == 0), We = new m.Computed(() => be.get() ? "even" : "odd");
setInterval(() => j.set(j.get() + 1), 1e3);
window.onload = () => {
  O = document.getElementById("target"), O ? Ee(() => (O && (O.innerText = We.get()), () => {
    console.log("index.ts: performing cleanup");
  })) : console.error("target element not found");
};
