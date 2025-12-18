/* eslint-disable import/order */
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Link } from "react-router-dom"
import pgsqlRaw from "../../pgsql.md?raw"

/**
 * Postgres Cheat Sheet card.
 * Shows the rendered markdown using `react-markdown`.
 */
const PgsqlCheatsheet = ({ compact = false }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700 font-bold">
            PG
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 mb-1">
            Postgres Cheat Sheet
          </h4>
          <p className="text-sm text-slate-600">Postgres reference</p>
        </div>
      </div>

      {compact ? (
        <div className="mb-4">
          <div className="text-sm text-slate-700 bg-slate-50 p-4 rounded-md">
            <ul className="list-disc pl-5">
              <li>Common DDL/DML commands</li>
              <li>Indexes & partitioning tips</li>
              <li>Transactions, window functions, and CTEs</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mb-4 bg-slate-50 p-4 rounded-md text-sm text-slate-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{pgsqlRaw}</ReactMarkdown>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <a
            href={`${import.meta.env.BASE_URL}pgsql.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-700 hover:text-green-800 font-semibold"
          >
            Open full cheat sheet
          </a>
          <Link
            to="/data-architecture"
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            View Database Page
          </Link>
        </div>

        <a
          href={`${import.meta.env.BASE_URL}pgsql.md`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center"
        >
          Open
        </a>
      </div>
    </div>
  )
}

PgsqlCheatsheet.propTypes = {
  compact: PropTypes.bool,
}

PgsqlCheatsheet.defaultProps = {
  compact: false,
}

export default PgsqlCheatsheet

