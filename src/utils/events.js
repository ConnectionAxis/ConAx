export function addListener(node, name, ...args) {
  let delegateSelector, fn, options;

  if (typeof args[0] === 'string') {
    [delegateSelector, fn, options] = args;
  } else {
    [fn, options] = args;
  }
  if (node)
    node.addEventListener(
      name,
      delegateSelector ? e => e.target.matches(delegateSelector) && fn(e) : fn,
      options,
    );
}
