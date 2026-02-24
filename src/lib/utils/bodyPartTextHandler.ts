type markDefs = {
  _key: string;
  _type: 'link';
  href: string;
};

// Finds the link markDef for a child
const getChildLinkDef = (child: { marks?: string[] }, block: { markDefs?: markDefs[] }) => {
  if (!child.marks || !block.markDefs) return null;
  return (
    block.markDefs.find((def) => child.marks?.includes(def._key) && def._type === 'link') || null
  );
};

// Check if a child has the 'strong' mark
const getChildStrongMark = (child: { marks?: string[] }) => {
  return !!child.marks && child.marks.includes('strong');
};

export { getChildLinkDef, getChildStrongMark };
