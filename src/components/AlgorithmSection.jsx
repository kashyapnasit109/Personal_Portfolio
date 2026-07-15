import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const algorithmCards = [
  {
    title: 'Sorting Algorithms',
    description: 'Merge sort, quick sort, heap sort — analyzing time complexity, stability, and space trade-offs.',
    concepts: ['Merge Sort — O(n log n)', 'Quick Sort — O(n log n) avg', 'Heap Sort — O(n log n)', 'Bubble Sort — O(n²)'],
  },
  {
    title: 'Graph Traversal',
    description: 'BFS, DFS, shortest path algorithms — understanding how connected systems are explored and optimized.',
    concepts: ['BFS — Level-order', 'DFS — Depth-first', 'Dijkstra — Shortest path', 'Topological Sort'],
  },
  {
    title: 'Complexity Analysis',
    description: 'Reasoning about best, average, worst case scenarios and space-time trade-offs for real-world decisions.',
    concepts: ['O(1) — Constant', 'O(log n) — Logarithmic', 'O(n) — Linear', 'O(n²) — Quadratic'],
  },
  {
    title: 'DAA Concepts',
    description: 'Divide and conquer, dynamic programming, greedy algorithms — powerful paradigms for problem decomposition.',
    concepts: ['Divide & Conquer', 'Dynamic Programming', 'Greedy Algorithms', 'Backtracking'],
  },
  {
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, graphs, hash maps — choosing the right structure shapes the entire solution.',
    concepts: ['Arrays & Linked Lists', 'Binary Trees & BST', 'Hash Maps', 'Stacks & Queues'],
  },
];

export default function AlgorithmSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="relative py-32 border-t border-surface-border bg-primary-darker" ref={ref}>
      <div className="container-custom">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Algorithmic Thinking</span>
          </div>
          <h2 className="heading-section text-white mb-6">
            Core <span className="text-surface-border stroke-text" style={{ WebkitTextStroke: '1px #A1A1AA', color: 'transparent' }}>Concepts.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {algorithmCards.map((card, i) => {
            const isExpanded = expanded === i;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className={`border border-surface-border p-6 md:p-8 cursor-pointer transition-colors duration-300 ${
                  isExpanded ? 'bg-surface border-accent' : 'bg-primary-dark hover:border-text-secondary'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-black text-xl md:text-2xl text-white uppercase tracking-tight">
                    {card.title}
                  </h3>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs transition-colors ${isExpanded ? 'border-accent text-accent' : 'border-surface-border text-text-muted'}`}>
                    {isExpanded ? '-' : '+'}
                  </div>
                </div>
                
                <p className="text-sm font-sans font-light text-text-secondary leading-relaxed">
                  {card.description}
                </p>

                {/* Concepts Expansion */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={isExpanded ? { height: 'auto', opacity: 1, marginTop: '2rem' } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-surface-border border-dashed"
                >
                  <div className="pt-6 grid sm:grid-cols-2 gap-4">
                    {card.concepts.map((concept, ci) => (
                      <div
                        key={ci}
                        className="font-mono text-xs text-white uppercase tracking-wider flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-accent inline-block"></span>
                        {concept}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
