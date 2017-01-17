# observable-defer

> Procedural object for creating a lightning fast observable.

observable-defer is a procedural means of creating Most.js streams, which are a very fast implementator of the Observable specification. It works like the well-known Promise.defer(), creating a top level object with the publish methods (`next`, `error` (non terminal), and `complete` to defer's `resolve` and `reject` methods) and the `observable` these methods publish into (versus defer's `promise`).

# Background

observable-defer was created to be an easy yet secure way of creating a very high performance observable stream, based on most.js.

Existing options for creating most streams procedurally were perceived as having significant usability conerns:

*[`most-subject`](https://github.com/mostjs-community/subject)* is very similar in nature, creating an object with publish methods on it. However rather than have a `observable` property attached, the subject itself is also the stream, making it difficult to use securely. Second, most-subject's implementation brings in most-multicast, which may or may not be desired for all use cases.

*[`most-create`](https://github.com/mostjs/create) has an interface more closely matching the Promise constructor. Lacking a good Promise.defer equivalent alone was a cause for observable-defer. Further, unlike the Promise constructor, the create constructor is run lazily (in the manner of [laissez-bird](https://github.com/rektide/laissez-bird)), when the observer is first observed, which makes trying to lift publish methods out of the constructor an interesting problem.

observable-defer is designed to provide immediate access to publish methods and the outputting observable, in an extremely fast manner.

# Usage

```
var obs= ObservableDefer()
obs.next(0) // ignored! no one observing the observable yet.
obs.observable.forEach(console.log).then(console.log.bind(null, "done")) // observe the observable
obs.next(1) //=> 1
obs.next(2) //=> 2
obs.complete() //=> done
```

## Notes

Note that while the observable-defer object immediately has publish methods, data passed to them will be dropped until the observable becomes observed. Check the `observed` property or attach an .onObserved handler to the object to check or see when the observable is observed.
